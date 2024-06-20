import { Exclude, Expose } from 'class-transformer';
import { CustomBaseSerializer } from 'src/common/serializers/base.serializer';

@Exclude()
export class ProductSerializer extends CustomBaseSerializer {
  @Expose()
  productSlug: string;
}
