import { Logger, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllExceptionFilter } from './common/exception/exception-filter';
import { LoggingInterceptor } from './common/interceptors/log.interceptor';
import { ResponseSuccessInterceptor } from './common/interceptors/response.interceptor';
import { configModuleConfigs } from './configs/config-module.config';
import { throttlerConfig } from './configs/throttler.config';
import { DatabaseModule } from './database/database.module';
import { ThrottlerStorageModule } from './typeorm-throttler-storage/throttler-storage.module';
import { WinstonWrapperModule } from './winston/winston.module';
import { AdminModule } from './admin/admin.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleConfigs),
    ThrottlerModule.forRootAsync(throttlerConfig),
    DatabaseModule,
    ThrottlerStorageModule,
    WinstonWrapperModule,
    AdminModule,
    ProductModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseSuccessInterceptor,
    },
    {
      provide: APP_PIPE,
      useFactory() {
        return new ValidationPipe({
          transform: true,
          whitelist: true,
        });
      },
    },
    Logger,
  ],
})
export class AppModule {}
