import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantEntity } from './entity/variant.entity';
import { VariantRepository } from './variant.repository';
import { VariantService } from './variant.service';
import { EntriesModule } from './entries/entries.module';

@Module({
  imports: [TypeOrmModule.forFeature([VariantEntity]), EntriesModule],
  providers: [VariantService, VariantRepository],
})
export class VariantModule {}
