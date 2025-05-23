import { Test, TestingModule } from '@nestjs/testing';
import { HavertsController } from './haverts.controller';
import { User } from '../users/entities/user.entity';
import { Farm } from '../farms/entities/farm.entity';
import { getTypeOrmConfig } from '../config/typeorm.config';
import { HavertsService } from './haverts.service';
import { FarmsService } from '../farms/farms.service';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Havert } from './entities/havert.entity';

describe('HavertsController', () => {
  let controller: HavertsController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FarmsService, UsersService, HavertsService],
      controllers: [HavertsController],
      imports: [
        TypeOrmModule.forRoot(getTypeOrmConfig()),
        TypeOrmModule.forFeature([User, Farm, Havert]),
      ],
    }).compile();

    controller = module.get<HavertsController>(HavertsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
