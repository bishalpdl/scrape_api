import { Exclude, Expose } from 'class-transformer';
import { CustomBaseSerializer } from 'src/common/serializers/base.serializer';

export enum AdminSerializerEnum {
  IncludePassword = 'IncludePassword',
}

@Exclude()
export class AdminSerializer extends CustomBaseSerializer {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose({ groups: [AdminSerializerEnum.IncludePassword] })
  password: string;

  @Expose({
    groups: [AdminSerializerEnum.IncludePassword],
  })
  salt: string;
}
