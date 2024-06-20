import { Injectable } from '@nestjs/common';
import { CustomBaseRepository } from 'src/common/repository/base.repository';
import { DataSource } from 'typeorm';
import { VariantEntity } from './entity/variant.entity';
import { VariantSerializer } from './variant.serializer';

@Injectable()
export class VariantRepository extends CustomBaseRepository<
  VariantEntity,
  VariantSerializer
> {
  constructor(dataSource: DataSource) {
    super(VariantEntity, dataSource, VariantSerializer);
  }
}
