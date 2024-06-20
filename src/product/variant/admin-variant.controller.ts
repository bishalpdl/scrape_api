import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SiteApiTags } from 'src/common/@types/enums/api-tags.enums';
import { PaginationQuery } from 'src/common/@types/interfaces/pagination.interface';
import { PositiveIntPipe } from 'src/common/pipe/positive-int.pipe';
import { VariantService } from './variant.service';

@Controller('admin/product/:productId/variant')
@ApiTags(SiteApiTags.Admin)
export class AdminVariantController {
  constructor(private readonly variantService: VariantService) {}

  @Get()
  pagination(
    @Param('productId', PositiveIntPipe) productId: number,
    @Query() paginationQuery: PaginationQuery,
  ) {
    return this.variantService.pagination(productId, paginationQuery);
  }

  @Get(':id')
  retrieve(
    @Param('productId', PositiveIntPipe) productId: number,
    @Param('id', PositiveIntPipe) id: number,
  ) {
    return this.variantService.retrieveOrFail(productId, id);
  }
}
