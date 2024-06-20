import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateVariantDto } from '../variant/dto/create.dto';

export class PublicCreateProductDto extends CreateVariantDto {
  @ApiProperty()
  @IsString()
  productSlug: string;
}
