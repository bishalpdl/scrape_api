import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerAsyncOptions } from '@nestjs/throttler';
import { ThrottlerStorageModule } from 'src/typeorm-throttler-storage/throttler-storage.module';
import { TypeormThrottlerStorageService } from 'src/typeorm-throttler-storage/throttler-storage.service';

export const throttlerConfig: ThrottlerAsyncOptions = {
  useFactory: (
    typeormStorage: TypeormThrottlerStorageService,
    configService: ConfigService,
  ) => ({
    storage: typeormStorage,
    errorMessage: "You're sending too many requests. Please try again later.",
    getTracker: (req) => (req.ips?.length ? req.ips[0] : req.ip),
    throttlers: [
      {
        limit: configService.getOrThrow<number>('throttler.maxRequestInSec'),
        ttl: 1_000,
      },
      {
        limit: configService.getOrThrow<number>('throttler.maxRequestInMin'),
        ttl: 60_000,
      },
    ],
  }),
  inject: [TypeormThrottlerStorageService, ConfigService],
  imports: [ThrottlerStorageModule, ConfigModule],
};
