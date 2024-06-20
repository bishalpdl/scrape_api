import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { PublicCreateProductDto } from './dto/public-create.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  create(createDto: PublicCreateProductDto) {
    console.log(createDto)
  }
}
