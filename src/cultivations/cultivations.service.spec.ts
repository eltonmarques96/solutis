import { Test, TestingModule } from '@nestjs/testing';
import { CultivationsService } from './cultivations.service';
import { FarmsService } from '../farms/farms.service';
import { UsersService } from '../users/users.service';
import { HavertsService } from '../haverts/haverts.service';
import { getTypeOrmConfig } from '../config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Farm } from '../farms/entities/farm.entity';
import { Havert } from '../haverts/entities/havert.entity';
import { Cultivation } from './entities/cultivation.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

describe('CultivationsService', () => {
  let cultivationService: CultivationsService;
  let harvestService: HavertsService;
  let userService: UsersService;
  let farmService: FarmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    harvestService = module.get<HavertsService>(HavertsService);
    userService = module.get<UsersService>(UsersService);
    farmService = module.get<FarmsService>(FarmsService);
    cultivationService = module.get<CultivationsService>(CultivationsService);
  });

  it('should be defined', () => {
    expect(cultivationService).toBeDefined();
    expect(userService).toBeDefined();
    expect(farmService).toBeDefined();
    expect(harvestService).toBeDefined();
  });
  it('should create a cultivation', async () => {
    const userParams: CreateUserDto = {
      firstName: 'John',
      lastName: 'Lennon',
      email: 'john.lennon@beatles.com',
      personalCode: '675.647.900-83',
      city: 'Walton',
      state: 'Liverpool',
    };
    expect(userService).toBeDefined();
    await userService.create(userParams);
    const user = await userService.findByEmail(userParams.email);
    const farmData = {
      name: 'Farm A',
      totalArea: 100,
      areableArea: 60,
      vegetationArea: 40,
      userId: user.id,
    };
    const farm = await farmService.create(farmData);
    expect(farmService).toBeDefined();
    const harvestData = {
      name: 'Safra 2025',
      farmId: farm.id,
    };
    const harvest = await harvestService.create(harvestData);
    const harvestResponse = await harvestService.findOne(harvest.id);
    expect(harvestResponse).toBeDefined();
    const cultivation = await cultivationService.create({
      harvestId: harvestResponse.id,
      name: 'Arroz',
    });
    expect(cultivation).toBeDefined();
  });
});
