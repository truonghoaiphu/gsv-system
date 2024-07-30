import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../entities/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async createInitialData() {
    const initialData = [
      { location_id: 1, location_name: 'Da Nang', organization: 'PNS', status: 'activated' },
      { location_id: 2, location_name: 'Ha Noi', organization: 'PNS', status: 'unactive' },
      { location_id: 3, location_name: 'Ho Chi Minh', organization: 'PNS', status: 'activated' },
      { location_id: 4, location_name: 'Nha Trang', organization: 'PLJ', status: 'activated' },
      { location_id: 5, location_name: 'Can Tho', organization: 'PLJ', status: 'activated' },
    ];

    await this.locationRepository.save(initialData);
  }
}
