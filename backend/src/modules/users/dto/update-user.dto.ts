import {
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Length,
  MaxLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Sachin Nayak' })
  @IsOptional()
  @IsString()
  @Length(2, 100)
  name?: string;

  @ApiPropertyOptional({ example: 'https://cdn.gelavu.in/avatars/abc.png', nullable: true })
  @IsOptional()
  @IsUrl({ require_protocol: true })
  @MaxLength(2048)
  avatar_url?: string | null;

  @ApiPropertyOptional({
    description: 'City UUID from GET /api/cities. Send null to clear.',
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  city_id?: string | null;

  @ApiPropertyOptional({ example: 'en' })
  @IsOptional()
  @IsString()
  @Length(2, 10)
  preferred_language?: string;

  @ApiPropertyOptional({ example: { show_phone: false }, nullable: true })
  @IsOptional()
  @IsObject()
  privacy_settings?: Record<string, unknown> | null;
}
