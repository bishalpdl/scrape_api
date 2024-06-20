import { Injectable } from '@nestjs/common';
import { CustomHttpStatusCode } from 'src/common/@types/enums/http-custom-code.enums';
import {
  PaginationOptions,
  PaginationQuery,
} from 'src/common/@types/interfaces/pagination.interface';
import { CustomException } from 'src/common/exception/custom-exception';
import { CreateVariantDto } from './dto/create.dto';
import { VariantEntity } from './entity/variant.entity';
import { EntriesService } from './entries/entries.service';
import { VariantRepository } from './variant.repository';

@Injectable()
export class VariantService {
  constructor(
    private readonly variantRepository: VariantRepository,
    private readonly entriesService: EntriesService,
  ) {}

  private async retrieveOrCreate(
    productId: number,
    url: string,
    variantId: string,
  ) {
    let variant = await this.variantRepository.findOne({
      where: {
        variantId,
      },
    });

    if (variant && variant?.url != url) {
      variant.url = url;
      await this.variantRepository.save(variant);
    }

    if (!variant) {
      variant = await this.variantRepository.save(
        this.variantRepository.create({
          product: {
            id: productId,
          },
          url,
          variantId,
        }),
      );
    }

    return variant;
  }

  async createVariant(productId: number, dto: CreateVariantDto) {
    const { url, variantId: variantId, ...entriesData } = dto;
    const variant = await this.retrieveOrCreate(productId, url, variantId);

    await this.entriesService.createOne(variant.id, entriesData);
  }

  pagination(productId: number, pageQuery: PaginationQuery) {
    const query: PaginationOptions<VariantEntity> = {
      ...pageQuery,
      where: {
        product: {
          id: productId,
        },
      },
    };
    return this.variantRepository.pagination(query);
  }

  async retrieveOrFail(productId: number, variantId: number) {
    const variant = await this.variantRepository.findOne({
      where: {
        id: variantId,
        product: {
          id: productId,
        },
      },
      relations: {
        entries: true,
      },
      order: {
        entries: {
          id: 'asc',
        },
      },
    });

    if (!variantId) {
      throw new CustomException(
        'Variant not found.',
        404,
        CustomHttpStatusCode.RetrieveVariantNotFound,
      );
    }

    return variant;
  }
}
