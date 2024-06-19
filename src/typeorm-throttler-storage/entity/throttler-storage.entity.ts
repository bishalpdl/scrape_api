import { EntityName } from 'src/common/@types/enums/entity-name.enums';
import { CustomBaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity({
  name: EntityName.ThrottlerStorage,
})
export class ThrottlerStorageEntity extends CustomBaseEntity {
  @Index()
  @Column()
  key: string;
}
