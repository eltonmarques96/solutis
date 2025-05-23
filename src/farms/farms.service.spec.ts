import { Test, TestingModule } from '@nestjs/testing';
import { FarmsService } from './farms.service';
import { UsersService } from '../users/users.service';
import { Farm } from './entities/farm.entity';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from '../config/typeorm.config';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

describe('FarmsService', () => {
  let userService: UsersService;
  let farmService: FarmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FarmsService, UsersService],
      imports: [
        TypeOrmModule.forRoot(getTypeOrmConfig()),
        TypeOrmModule.forFeature([User, Farm]),
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    farmService = module.get<FarmsService>(FarmsService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(farmService).toBeDefined();
  });

  it('should create a farm', async () => {
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
    const farmResponse = await farmService.findOne(farm.id);
    expect(farmResponse.length).toEqual(1);
  });
  it('should not create a farm with total area incompatible with vegetation area and areable area', async () => {
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
      vegetationArea: 50,
      userId: user.id,
    };
    const farm = await farmService.create(farmData);
    expect(farmService).toBeDefined();
    expect(farm).toBeNull();
  });
  it('should create two farms for an unique user', async () => {
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
    const farmAData = {
      name: 'Farm A',
      totalArea: 100,
      areableArea: 60,
      vegetationArea: 40,
      userId: user.id,
    };
    const farmBData = {
      name: 'Farm B',
      totalArea: 150,
      areableArea: 60,
      vegetationArea: 90,
      userId: user.id,
    };
    await farmService.create(farmAData);
    await farmService.create(farmBData);
    expect(farmService).toBeDefined();
    const userResponse = await userService.findByEmail(userParams.email);
    expect(userResponse.farms.length).toEqual(2);
  });
});
