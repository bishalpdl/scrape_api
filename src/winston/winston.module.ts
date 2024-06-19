import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModule, utilities as winstonUtils } from 'nest-winston';
import { WriteAbleErrorContext } from 'src/common/constants/error-context';
import * as winston from 'winston';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        level: !configService.get('isProd') ? 'debug' : 'http',
        exitOnError: false,
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              winstonUtils.format.nestLike('enirman_v2', {
                colors: true,
                prettyPrint: true,
              }),
            ),
          }),
          new winston.transports.File({
            level: 'silly',
            format: winston.format.combine(
              winston.format.combine(
                winston.format.timestamp(),
                winston.format((info) => {
                  if (
                    info?.level == 'error' &&
                    Object.values(WriteAbleErrorContext).includes(info?.context)
                  ) {
                    return info;
                  }
                  return false;
                })(),
              ),
              winstonUtils.format.nestLike('enirman_v2', {
                colors: false,
                prettyPrint: true,
              }),
            ),
            filename: 'error-file.log',
            maxsize: 1500 * 1000, // 1 error = 1500 char, maxCapacity before erasing = 1000
          }),
        ],
      }),
      inject: [ConfigService],
      imports: [],
    }),
  ],
  providers: [],
})
export class WinstonWrapperModule {}
