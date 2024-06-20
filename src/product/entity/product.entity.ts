import { EntityName } from 'src/common/@types/enums/entity-name.enums';
import { CustomBaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { VariantEntity } from '../variant/entity/variant.entity';

@Entity({
  name: EntityName.Product,
})
@Index('unique_product', ['productSlug'], { unique: true })
export class ProductEntity extends CustomBaseEntity {
  @Column()
  productSlug: string;

  @OneToMany(() => VariantEntity, (variant) => variant.product)
  variant: VariantEntity[];
}
