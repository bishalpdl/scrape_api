import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from './entities/image.entity';

import { ImageRepository } from './image.repository';
import { ImageService } from './image.service';

@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity])],
  controllers: [],
  providers: [ImageService, ImageRepository],
  exports: [ImageService],
})
export class ImageModule {}
