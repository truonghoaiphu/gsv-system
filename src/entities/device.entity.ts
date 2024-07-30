import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Location } from './location.entity';

@Entity()
export class Device {
  @PrimaryColumn()
  id: string;

  @Column()
  type: string;

  @Column()
  serial: string;

  @Column()
  status: string;

  @Column()
  description: string;

  @Column()
  created_at: number;

  @Column()
  updated_at: number;

  @Column()
  location_id: number;

  @ManyToOne(() => Location, (location) => location.id)
  @JoinColumn({ name: 'location_id' })
  location: Location;
}
