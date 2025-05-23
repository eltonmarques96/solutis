import { Havert } from '../../haverts/entities/havert.entity';
import { User } from '../../users/entities/user.entity';
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
export class Farm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  totalArea: number;

  @Column({ nullable: false })
  areableArea: number;

  @Column({ nullable: false })
  vegetationArea: number;

  @ManyToOne(() => User, (user) => user.farms)
  user: User;

  @OneToMany(() => Havert, (harvest) => harvest.farm)
  harvests: Havert[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
