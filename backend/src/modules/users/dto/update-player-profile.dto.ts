import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { DominantHand, PlayingLevel } from '../../../database/entities/player-profile.entity';
import { PREFERRED_CATEGORIES } from '../users.constants';

// Only player-editable fields. Rating, reliability, match stats and is_verified
// are system-managed and deliberately not accepted here.
export class UpdatePlayerProfileDto {
  @ApiPropertyOptional({ enum: PlayingLevel })
  @IsOptional()
  @IsEnum(PlayingLevel)
  playing_level?: PlayingLevel;

  @ApiPropertyOptional({ example: 'Aggressive smasher', nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  play_style?: string | null;

  @ApiPropertyOptional({ enum: DominantHand })
  @IsOptional()
  @IsEnum(DominantHand)
  dominant_hand?: DominantHand;

  @ApiPropertyOptional({ example: 'Indiranagar', nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  area?: string | null;

  @ApiPropertyOptional({ enum: PREFERRED_CATEGORIES, isArray: true, nullable: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(PREFERRED_CATEGORIES.length)
  @IsIn(PREFERRED_CATEGORIES, { each: true })
  preferred_categories?: string[] | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  bio?: string | null;
}
