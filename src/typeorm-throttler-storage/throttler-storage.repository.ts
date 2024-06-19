import { Injectable } from '@nestjs/common';
import { CustomBaseRepository } from 'src/common/repository/base.repository';
import { CustomBaseSerializer } from 'src/common/serializers/base.serializer';
import { DataSource } from 'typeorm';
import { ThrottlerStorageEntity } from './entity/throttler-storage.entity';

@Injectable()
export class ThrottlerStorageRepository extends CustomBaseRepository<
  ThrottlerStorageEntity,
  CustomBaseSerializer
> {
  constructor(dataSource: DataSource) {
    super(ThrottlerStorageEntity, dataSource, CustomBaseSerializer);
  }
}
