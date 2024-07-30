import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Location } from './entities/location.entity';
import { Device } from './entities/device.entity';
import { LocationService } from './location/location.service';
import { AssetsModule } from './assets/assets.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'gsv_system',
      password: 'dbpassword',
      database: 'database',
      entities: [Location, Device],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Location, Device]),
    AssetsModule,
  ],
  controllers: [AppController],
  providers: [AppService, LocationService],
})
export class AppModule {}
