import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sport } from '../../database/entities/sport.entity';
import { City } from '../../database/entities/city.entity';

@Injectable()
export class ReferenceService {
  constructor(
    @InjectRepository(Sport)
    private readonly sportRepository: Repository<Sport>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  listSports() {
    return this.sportRepository.find({
      where: { is_active: true },
      order: { name: 'ASC' },
    });
  }

  listCities() {
    return this.cityRepository.find({
      where: { is_active: true },
      order: { name: 'ASC' },
    });
  }
}
