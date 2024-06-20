import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantEntity } from './entity/variant.entity';
import { EntriesModule } from './entries/entries.module';
import { VariantRepository } from './variant.repository';
import { VariantService } from './variant.service';

@Module({
  imports: [TypeOrmModule.forFeature([VariantEntity]), EntriesModule],
  providers: [VariantService, VariantRepository],
  exports: [VariantService],
})
export class VariantModule {}
