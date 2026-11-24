import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../database/entities/user.entity';
import { PlayerProfile } from '../../database/entities/player-profile.entity';
import { HostProfile } from '../../database/entities/host-profile.entity';
import { City } from '../../database/entities/city.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, PlayerProfile, HostProfile, City])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
