import { Module } from '@nestjs/common';
import { CultivationsService } from './cultivations.service';
import { CultivationsController } from './cultivations.controller';
import { Havert } from '../haverts/entities/havert.entity';
import { User } from '../users/entities/user.entity';
import { Farm } from '../farms/entities/farm.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cultivation } from './entities/cultivation.entity';
import { UsersService } from '../users/users.service';
import { FarmsService } from '../farms/farms.service';
import { HavertsService } from '../haverts/haverts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Farm, User, Havert, Cultivation])],
  controllers: [CultivationsController],
  providers: [HavertsService, FarmsService, UsersService, CultivationsService],
})
export class CultivationsModule {}
