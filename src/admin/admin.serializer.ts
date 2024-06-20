import { Exclude, Expose } from 'class-transformer';
import { CustomBaseSerializer } from 'src/common/serializers/base.serializer';

@Exclude()
export class AdminSerializer extends CustomBaseSerializer {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  password: string;

  @Expose()
  salt: string;
}
