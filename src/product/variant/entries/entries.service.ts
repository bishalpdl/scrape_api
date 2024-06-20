import { Injectable } from '@nestjs/common';
import { CreateEntriesDto } from './dto/create.dto';
import { EntriesRepository } from './entries.repository';

@Injectable()
export class EntriesService {
  constructor(private readonly entriesRepository: EntriesRepository) {}

  private findSimilar(dto: CreateEntriesDto) {
    return this.entriesRepository
      .createQueryBuilder()
      .where('title=:title', { title: dto.title })
      .andWhere('description=:description', { description: dto.description })
      .andWhere('price=:price', { price: dto.price })
      .getOne();
  }

  async createOne(variantId: number, dto: CreateEntriesDto) {
    const similar = await this.findSimilar(dto);

    if (similar) {
      return await this.entriesRepository.save(
        this.entriesRepository.create({
          samePreviousEntry: {
            id: similar.id,
          },
        }),
      );
    }

    await this.entriesRepository.save(
      this.entriesRepository.create({
        ...dto,
        variant: {
          id: variantId,
        },
      }),
    );
  }
}
