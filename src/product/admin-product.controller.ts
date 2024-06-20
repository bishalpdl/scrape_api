import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SiteApiTags } from 'src/common/@types/enums/api-tags.enums';
import { PaginationQuery } from 'src/common/@types/interfaces/pagination.interface';
import { ProductService } from './product.service';

@Controller('admin/product')
@ApiTags(SiteApiTags.Admin)
export class AdminProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  pagination(@Query() paginationQuery: PaginationQuery) {
    return this.productService.pagination(paginationQuery);
  }
}
