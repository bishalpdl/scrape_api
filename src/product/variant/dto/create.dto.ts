import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';
import { CreateEntriesDto } from '../entries/dto/create.dto';

export class CreateVariantDto extends CreateEntriesDto {
  @ApiProperty()
  @IsString()
  @IsUrl()
  url: string;

  @ApiProperty()
  @IsString()
  variantId: string;
}
