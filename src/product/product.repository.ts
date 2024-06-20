import { Injectable } from '@nestjs/common';
import { CustomBaseRepository } from 'src/common/repository/base.repository';
import { DataSource } from 'typeorm';
import { ProductEntity } from './entity/product.entity';
import { ProductSerializer } from './product.serializer';

@Injectable()
export class ProductRepository extends CustomBaseRepository<
  ProductEntity,
  ProductSerializer
> {
  constructor(dataSource: DataSource) {
    super(ProductEntity, dataSource, ProductSerializer);
  }
}
