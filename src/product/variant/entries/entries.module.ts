import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantEntriesEntity } from './entity/entries.entity';
import { EntriesRepository } from './entries.repository';

@Module({
  imports: [TypeOrmModule.forFeature([VariantEntriesEntity])],
  providers: [EntriesRepository],
})
export class EntriesModule {}
