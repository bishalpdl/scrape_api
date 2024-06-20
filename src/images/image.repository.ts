import { Injectable } from '@nestjs/common';
import { CustomBaseRepository } from 'src/common/repository/base.repository';
import { DataSource } from 'typeorm';
import { ImageEntity } from './entities/image.entity';
import { ImageSerializer } from './image.serializer';

@Injectable()
export class ImageRepository extends CustomBaseRepository<
  ImageEntity,
  ImageSerializer
> {
  constructor(dataSource: DataSource) {
    super(ImageEntity, dataSource, ImageSerializer);
  }
}
