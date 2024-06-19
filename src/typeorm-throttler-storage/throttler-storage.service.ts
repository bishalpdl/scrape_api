import { Injectable } from '@nestjs/common';
import { ThrottlerStorage } from '@nestjs/throttler';
import { ThrottlerStorageRecord } from '@nestjs/throttler/dist/throttler-storage-record.interface';
import { ThrottlerStorageRepository } from './throttler-storage.repository';

@Injectable()
export class TypeormThrottlerStorageService implements ThrottlerStorage {
  constructor(
    private readonly throttlerStorageRepository: ThrottlerStorageRepository,
  ) {}

  async increment(key: string, ttl: number): Promise<ThrottlerStorageRecord> {
    const keyPerTtl = `${key}_${ttl}`;

    const counters = await this.throttlerStorageRepository
      .createQueryBuilder('throttler')
      .where('throttler.key = :key', { key: keyPerTtl })
      .andWhere('throttler.createdAt > :date', {
        date: new Date(Date.now() - ttl),
      })
      .getCount();

    this.throttlerStorageRepository.insert({ key: keyPerTtl });

    return { totalHits: counters, timeToExpire: ttl };
  }
}
