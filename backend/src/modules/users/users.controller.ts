import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePlayerProfileDto } from './dto/update-player-profile.dto';
import { SubmitHostKycDto } from './dto/submit-host-kyc.dto';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users/me')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get my profile with player and host profiles' })
  getMe(@CurrentUser('id') userId: string) {
    return this.usersService.getMe(userId);
  }

  @Patch()
  @ApiOperation({ summary: 'Update my account details (name, city, avatar, language, privacy)' })
  updateMe(@CurrentUser('id') userId: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updateMe(userId, dto);
  }

  @Patch('player-profile')
  @ApiOperation({ summary: 'Update my player profile (level, hand, style, categories, bio)' })
  updatePlayerProfile(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdatePlayerProfileDto,
  ) {
    return this.usersService.updatePlayerProfile(userId, dto);
  }

  @Post('host-profile/kyc')
  @ApiOperation({ summary: 'Submit or resubmit host KYC (HOST role required)' })
  submitHostKyc(@CurrentUser('id') userId: string, @Body() dto: SubmitHostKycDto) {
    return this.usersService.submitHostKyc(userId, dto);
  }
}
