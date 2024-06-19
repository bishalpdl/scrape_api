import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerStorageEntity } from './entity/throttler-storage.entity';
import { ThrottlerStorageRepository } from './throttler-storage.repository';
import { TypeormThrottlerStorageService } from './throttler-storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([ThrottlerStorageEntity])],
  providers: [ThrottlerStorageRepository, TypeormThrottlerStorageService],
  exports: [TypeormThrottlerStorageService],
})
export class ThrottlerStorageModule {}
