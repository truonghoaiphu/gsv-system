import { Controller, Get } from '@nestjs/common';
import { LocationService } from './location/location.service';

@Controller()
export class AppController {
  constructor(private readonly locationService: LocationService) {
    this.locationService.createInitialData(); 
  }

  @Get()
  getData() {
    return { message: 'Data has been migrated' };
  }
}
