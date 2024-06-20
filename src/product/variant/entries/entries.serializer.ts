import { Exclude, Expose, Type } from 'class-transformer';
import { CustomBaseSerializer } from 'src/common/serializers/base.serializer';

@Exclude()
export class EntriesSerializer extends CustomBaseSerializer {
  @Expose()
  title: string;

  @Expose()
  description?: string;

  @Expose()
  price?: number;

  @Expose()
  @Type(() => EntriesSerializer)
  previousEntry: EntriesSerializer;
}
