import {
  ApiProperty,
  ApiPropertyOptional,
  ApiResponseProperty,
} from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class PublicCreateProductDto {
  @ApiProperty()
  @IsString()
  productSlug: string;

  @ApiProperty()
  @IsString()
  @IsUrl()
  url: string;

  @ApiProperty()
  @IsString()
  variantId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  price: number;
}
