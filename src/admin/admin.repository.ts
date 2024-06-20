import { Injectable } from '@nestjs/common';
import { CustomBaseRepository } from 'src/common/repository/base.repository';
import { DataSource } from 'typeorm';
import { AdminSerializer } from './admin.serializer';
import { AdminEntity } from './entity/admin.entity';

@Injectable()
export class AdminRepository extends CustomBaseRepository<
  AdminEntity,
  AdminSerializer
> {
  constructor(dataSource: DataSource) {
    super(AdminEntity, dataSource, AdminSerializer);
  }
}
