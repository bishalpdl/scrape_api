import { Body, Controller, Post } from '@nestjs/common';
import { PublicCreateProductDto } from './dto/public-create.dto';
import { ProductService } from './product.service';

@Controller('public/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  post(@Body() createDto: PublicCreateProductDto) {
    return this.productService.create(createDto);
  }
}
