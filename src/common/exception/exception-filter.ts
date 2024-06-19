import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import { isArray } from 'class-validator';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import {
  filterResponseOnError,
  validationErrors,
} from '../@types/interfaces/validation-error.interface';
import { WriteAbleErrorContext } from '../constants/error-context';
import { CustomException } from './custom-exception';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const { httpAdapter } = this.httpAdapterHost;

    let status = 500;

    const responseObj: filterResponseOnError = {
      success: false,
      message: (exception as any)?.message ?? 'Internal server error',
    };

    console.log(exception);

    if (exception instanceof HttpException) {
      status = (exception as HttpException).getStatus();
      const errorMsg: any = (exception as HttpException).getResponse();

      responseObj.customCode =
        exception instanceof CustomException ? exception.getCode() : status;

      if (typeof errorMsg === 'object' && isArray(errorMsg?.message)) {
        responseObj.message = (errorMsg as validationErrors)?.message[0];
        responseObj.validationErr = errorMsg?.message;
      }
    } else if (exception instanceof QueryFailedError) {
      if (exception.driverError?.code === '23505') {
        status = HttpStatus.CONFLICT;
        responseObj.message =
          'Error: Duplicate entry. ' + exception.driverError?.detail ?? '';
      }

      if (exception.driverError?.code === '23502') {
        status = HttpStatus.BAD_REQUEST;
        responseObj.message = `Incomplete data. ${exception.driverError?.column ? exception.driverError?.column + ' is required.' : ''}`;
      }
    }

    const exceptionStack = (exception as any)?.stack;

    this.logger.error(
      `Error: ${request?.method} ${status} ${
        request?.originalUrl || request?.url || 'Unknown route'
      } : ${responseObj.message} ${
        this.configService.get('isDev') ? responseObj?.validationErr : ''
      }`,
      exceptionStack,
      status < 500
        ? this.constructor.name
        : WriteAbleErrorContext.ReqestResponseError,
    );

    if (!this.configService.get('isProd') && exceptionStack) {
      responseObj.stack = exceptionStack;
    }

    httpAdapter.reply(response, responseObj, status);
    // return response.status(status).json(responseObj);
  }
}
