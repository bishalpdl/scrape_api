import { Module } from '@nestjs/common';
import { ProductController } from './public-product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { ProductRepository } from './product.repository';
import { VariantModule } from './variant/variant.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), VariantModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
