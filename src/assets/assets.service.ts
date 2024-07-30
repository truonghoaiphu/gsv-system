import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';
import axios from 'axios';
import { Device } from '../entities/device.entity';
import { Location } from '../entities/location.entity';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    private dataSource: DataSource,
  ) {}

  async syncAssets() {
    const apiUrl = 'https://669ce22d15704bb0e304842d.mockapi.io/assets';

    try {
      const response = await axios.get(apiUrl);
      const assets = response.data;
      if (!assets || assets.length === 0) {
        console.log('No assets data returned from API');
        return;
      }

      const now = Math.floor(Date.now() / 1000);
      const filteredAssets = assets.filter(asset => 
        asset.status === 'active' &&
        asset.created_at <= now &&
        asset.updated_at <= now
      );

      const locationIds = [...new Set(filteredAssets.map(asset => asset.location_id))];
      const locations = await this.locationRepository.find({
        where: { location_id: In(locationIds) }
      });

      const locationMap = new Map<number, Location>();
      locations.forEach(location => locationMap.set(location.location_id, location));

      await this.dataSource.transaction(async transactionalEntityManager => {
        for (const asset of filteredAssets) {
          const location = locationMap.get(asset.location_id);
          if (location) {
            await transactionalEntityManager.save(Device, {
              ...asset,
              location,
            });
          }
        }
      });

      console.log('Assets synchronized successfully');
    } catch (error) {
      console.error('Error syncing assets:', error);
      throw error;
    }
  }
}
