import { EntityName } from 'src/common/@types/enums/entity-name.enums';
import { CustomBaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: EntityName.Image,
})
export class ImageEntity extends CustomBaseEntity {
  @Column()
  url: string;
}
