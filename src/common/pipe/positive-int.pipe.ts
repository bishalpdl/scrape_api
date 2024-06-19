import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class PositiveIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value);
    if (isNaN(val)) {
      throw new BadRequestException(metadata.data + ' must be an integer');
    }

    if (val <= 0) {
      throw new BadRequestException(
        metadata.data + ' must be a positive integer',
      );
    }

    return val;
  }
}
