import { EntityName } from 'src/common/@types/enums/entity-name.enums';
import { CustomBaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToMany, OneToOne } from 'typeorm';
import { VariantEntity } from '../../entity/variant.entity';

@Entity({
  name: EntityName.ProductVariantEntries,
})
export class VariantEntriesEntity extends CustomBaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  price?: number;

  @OneToOne(() => VariantEntriesEntity, { eager: true })
  @JoinColumn()
  previousEntry: VariantEntriesEntity;

  @ManyToMany(() => VariantEntity, (variant) => variant.entries)
  variant: VariantEntity;
}
