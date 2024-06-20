import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantEntriesEntity } from './entity/entries.entity';
import { EntriesRepository } from './entries.repository';
import { EntriesService } from './entries.service';

@Module({
  imports: [TypeOrmModule.forFeature([VariantEntriesEntity])],
  providers: [EntriesRepository, EntriesService],
  exports: [EntriesService],
})
export class EntriesModule {}
