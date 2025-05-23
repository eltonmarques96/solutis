import { Test, TestingModule } from '@nestjs/testing';
import { CultivationsController } from './cultivations.controller';
import { CultivationsService } from './cultivations.service';
import { HavertsService } from '../haverts/haverts.service';
import { UsersService } from '../users/users.service';
import { FarmsService } from '../farms/farms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from '../config/typeorm.config';
import { User } from '../users/entities/user.entity';
import { Farm } from '../farms/entities/farm.entity';
import { Havert } from '../haverts/entities/havert.entity';
import { Cultivation } from './entities/cultivation.entity';

describe('CultivationsController', () => {
  let controller: CultivationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CultivationsController],
      providers: [
        FarmsService,
        UsersService,
        HavertsService,
        CultivationsService,
      ],
      imports: [
        TypeOrmModule.forRoot(getTypeOrmConfig()),
        TypeOrmModule.forFeature([User, Farm, Havert, Cultivation]),
      ],
    }).compile();

    controller = module.get<CultivationsController>(CultivationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
