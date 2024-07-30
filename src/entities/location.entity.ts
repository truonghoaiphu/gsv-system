import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Device } from './device.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  location_id: number;

  @Column()
  location_name: string;

  @Column()
  organization: string;

  @Column()
  status: string;

  @OneToMany(() => Device, (device) => device.location)
  devices: Device[];
}
