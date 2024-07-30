import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from '../entities/device.entity';
import { Location } from '../entities/location.entity';
import { AssetsService } from './assets.service';
import { AssetsCronService } from './assets-cron.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Device, Location]),
  ],
  providers: [AssetsService, AssetsCronService],
})
export class AssetsModule {}
