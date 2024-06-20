import { Injectable } from '@nestjs/common';
import { ImageRepository } from './image.repository';

@Injectable()
export class ImageService {
  constructor(private readonly repository: ImageRepository) {}

  storeImage(url: string) {
    const image = this.repository.create({ url });
    return this.repository.save(image);
  }

  storeImages(files: string[]) {
    return Promise.all(files.map((file) => this.storeImage(file)));
  }
}
