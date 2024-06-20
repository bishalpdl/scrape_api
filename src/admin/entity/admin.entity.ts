import { EntityName } from 'src/common/@types/enums/entity-name.enums';
import { CustomBaseEntity } from 'src/common/entity/base.entity';
import { generateHash } from 'src/common/helpers/functions/hashing';
import { Column, Entity, Index } from 'typeorm';

@Entity({
  name: EntityName.Admin,
})
@Index('unique_email', ['email'], { unique: true })
export class AdminEntity extends CustomBaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  async verifyPassword(password: string): Promise<boolean> {
    const { hashedValue: hashedPassword } = await generateHash(
      password,
      this.salt,
    );
    return this.password === hashedPassword;
  }
}
