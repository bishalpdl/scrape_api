import { Injectable } from '@nestjs/common';
import { EntriesRepository } from './entries.repository';

@Injectable()
export class EntriesService {
  constructor(private readonly entriesRepository: EntriesRepository) {}
}
