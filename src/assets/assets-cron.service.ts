import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AssetsService } from './assets.service';

@Injectable()
export class AssetsCronService {
  constructor(private readonly assetsService: AssetsService) {}

  @Cron('0 0 * * *') // run at 12am
  async handleCron() {
    console.log('Syncing assets...');
    await this.assetsService.syncAssets();
  }
}
