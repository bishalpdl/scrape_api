import { EntityName } from 'src/common/@types/enums/entity-name.enums';
import { CustomBaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { VariantEntity } from '../../entity/variant.entity';

@Entity({
  name: EntityName.ProductVariantEntries,
})
export class VariantEntriesEntity extends CustomBaseEntity {
  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  price?: number;

  @ManyToOne(() => VariantEntriesEntity, { eager: true })
  @JoinColumn({ name: 'previousEntryId' })
  samePreviousEntry: VariantEntriesEntity;

  @ManyToMany(() => VariantEntity, (variant) => variant.entries)
  variant: VariantEntity;
}
