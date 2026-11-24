import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ActiveMode } from '../../../database/entities/user.entity';

export class SwitchModeDto {
  @ApiProperty({
    enum: ActiveMode,
    example: ActiveMode.HOST,
    description: 'Target mode: PLAY or HOST',
  })
  @IsNotEmpty()
  @IsEnum(ActiveMode)
  mode: ActiveMode;
}
