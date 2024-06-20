import { Injectable } from '@nestjs/common';
import { CustomBaseRepository } from 'src/common/repository/base.repository';
import { DataSource } from 'typeorm';
import { VariantEntriesEntity } from './entity/entries.entity';
import { EntriesSerializer } from './entries.serializer';

@Injectable()
export class EntriesRepository extends CustomBaseRepository<
  VariantEntriesEntity,
  EntriesSerializer
> {
  constructor(dataSource: DataSource) {
    super(VariantEntriesEntity, dataSource, EntriesSerializer);
  }
}
