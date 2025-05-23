import { Module } from '@nestjs/common';
import { HavertsService } from './haverts.service';
import { HavertsController } from './haverts.controller';
import { User } from '../users/entities/user.entity';
import { Farm } from '../farms/entities/farm.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmsService } from '../farms/farms.service';
import { UsersService } from '../users/users.service';
import { Havert } from './entities/havert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Farm, User, Havert])],
  controllers: [HavertsController],
  providers: [HavertsService, FarmsService, UsersService],
})
export class HavertsModule {}
