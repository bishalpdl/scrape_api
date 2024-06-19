import { HttpException, HttpStatus } from '@nestjs/common';
import { CustomHttpStatusCode } from '../@types/enums/http-custom-code.enums';

/**
 * message: string
 * status: HttpStatus
 * code: CustomHttpStatusCode
 */
export class CustomException extends HttpException {
  private readonly code: number;

  constructor(
    message: string,
    status?: HttpStatus,
    customCode?: CustomHttpStatusCode,
  ) {
    super(message, status || HttpStatus.BAD_REQUEST);
    this.code = customCode || HttpStatus.BAD_REQUEST;
  }

  getCode() {
    return this.code;
  }
}
