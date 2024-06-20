import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminProductController } from './admin-product.controller';
import { ProductEntity } from './entity/product.entity';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { PublicProductController } from './public-product.controller';
import { VariantModule } from './variant/variant.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), VariantModule],
  controllers: [PublicProductController, AdminProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
