import { Injectable } from '@nestjs/common';
import { CreateVariantDto } from './dto/create.dto';
import { VariantRepository } from './variant.repository';
import { EntriesService } from './entries/entries.service';

@Injectable()
export class VariantService {
  constructor(
    private readonly variantRepository: VariantRepository,
    private readonly entriesService: EntriesService,
  ) {}

  private async retrieveOrCreate(url: string, variantId: string) {
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
          url,
          variantId,
        }),
      );
    }

    return variant;
  }

  async createVariant(dto: CreateVariantDto) {
    const { url, variantId: variantId, ...entriesData } = dto;
    const variant = await this.retrieveOrCreate(url, variantId);

    await this.entriesService.createOne(variant.id, entriesData);
  }
}
