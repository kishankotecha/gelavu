import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReferenceService } from './reference.service';

@ApiTags('Reference')
@Controller()
export class ReferenceController {
  constructor(private readonly referenceService: ReferenceService) {}

  @Get('sports')
  @ApiOperation({ summary: 'List active sports with default scoring rules' })
  listSports() {
    return this.referenceService.listSports();
  }

  @Get('cities')
  @ApiOperation({ summary: 'List active cities' })
  listCities() {
    return this.referenceService.listCities();
  }
}
