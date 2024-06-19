import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CustomBaseSerializer {
  @Expose()
  id: number;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;
}
