import { EntityName } from 'src/common/@types/enums/entity-name.enums';
import { CustomBaseEntity } from 'src/common/entity/base.entity';
import { ProductEntity } from 'src/product/entity/product.entity';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { VariantEntriesEntity } from '../entries/entity/entries.entity';

@Entity({
  name: EntityName.ProductVariant,
})
@Index('unique_variant', ['variantSlug'], { unique: true })
export class VariantEntity extends CustomBaseEntity {
  @Column()
  url: string;

  @Column()
  variantSlug: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  price?: number;

  @ManyToOne(() => ProductEntity, (product) => product.variant)
  product: ProductEntity;

  @OneToMany(() => VariantEntriesEntity, (entries) => entries.variant)
  entries: VariantEntriesEntity[];
}
