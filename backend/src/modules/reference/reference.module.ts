import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sport } from '../../database/entities/sport.entity';
import { City } from '../../database/entities/city.entity';
import { ReferenceController } from './reference.controller';
import { ReferenceService } from './reference.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sport, City])],
  controllers: [ReferenceController],
  providers: [ReferenceService],
})
export class ReferenceModule {}
