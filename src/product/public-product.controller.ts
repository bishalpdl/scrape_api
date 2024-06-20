import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SiteApiTags } from 'src/common/@types/enums/api-tags.enums';
import { PublicCreateProductDto } from './dto/public-create.dto';
import { ProductService } from './product.service';

@Controller('public/product')
@ApiTags(SiteApiTags.Public)
export class PublicProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  post(@Body() createDto: PublicCreateProductDto) {
    return this.productService.create(createDto);
  }
}
