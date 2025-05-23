import { Cultivation } from '../../cultivations/entities/cultivation.entity';
import { Farm } from '../../farms/entities/farm.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Havert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => Farm, (farm) => farm.harvests)
  farm: Farm;

  @OneToMany(() => Cultivation, (cultivation) => cultivation.harvert)
  cultivations: Cultivation[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
