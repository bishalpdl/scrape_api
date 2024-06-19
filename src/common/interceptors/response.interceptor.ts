import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface SuccessResponse<T> {
  data?: T;
  message?: string;
}

@Injectable()
export class ResponseSuccessInterceptor<T>
  implements NestInterceptor<T, SuccessResponse<T>>
{
  constructor(private readonly configService: ConfigService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SuccessResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        if (!this.configService.get('isProd')) {
          console.log('Response Sent: ');
          console.dir({ data }, { depth: 10 });
        }
        return {
          success: true,
          message: data?.message || 'Operation succeed.',
          data: data?.data ?? data,
        };
      }),
    );
  }
}
