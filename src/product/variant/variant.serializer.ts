import { Exclude, Expose } from 'class-transformer';
import { CustomBaseSerializer } from 'src/common/serializers/base.serializer';

@Exclude()
export class VariantSerializer extends CustomBaseSerializer {
  @Expose()
  url: string;

  @Expose()
  variantId: string;

  @Expose()
  title: string;

  @Expose()
  description?: string;

  @Expose()
  price?: number;
}
