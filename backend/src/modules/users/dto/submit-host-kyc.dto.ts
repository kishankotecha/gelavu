import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsUUID, Length, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GSTIN_REGEX, INDIAN_MOBILE_REGEX, PAN_REGEX } from '../users.constants';

const trimmedUpper = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim().toUpperCase() : value;

export class SubmitHostKycDto {
  @ApiProperty({ example: 'Bengaluru Smash Club' })
  @IsString()
  @Length(2, 150)
  organization_name: string;

  @ApiProperty({ example: '9876543210', description: '10-digit Indian mobile number' })
  @IsString()
  @Matches(INDIAN_MOBILE_REGEX, { message: 'contact_phone must be a valid 10-digit Indian mobile number' })
  contact_phone: string;

  @ApiProperty({ description: 'City UUID from GET /api/cities' })
  @IsUUID()
  city_id: string;

  @ApiProperty({ example: 'ABCDE1234F' })
  @Transform(trimmedUpper)
  @IsString()
  @Matches(PAN_REGEX, { message: 'pan_number must be a valid PAN (e.g. ABCDE1234F)' })
  pan_number: string;

  @ApiPropertyOptional({ example: '29ABCDE1234F1Z5', nullable: true })
  @IsOptional()
  @Transform(trimmedUpper)
  @IsString()
  @Matches(GSTIN_REGEX, { message: 'gstin must be a valid 15-character GSTIN' })
  gstin?: string | null;
}
