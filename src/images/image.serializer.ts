import { Exclude, Expose } from 'class-transformer';
import { CustomBaseSerializer } from 'src/common/serializers/base.serializer';

@Exclude()
export class ImageSerializer extends CustomBaseSerializer {
  @Expose()
  url: string;
}
