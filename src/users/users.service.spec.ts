import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { getTypeOrmConfig } from '../config/typeorm.config';

describe('UsersService', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      imports: [
        TypeOrmModule.forRoot(getTypeOrmConfig()),
        TypeOrmModule.forFeature([User]),
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create an user', async () => {
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
    expect(user).toBeDefined();
    expect(user.email).toEqual(userParams.email);
  });

  it('should not create two users with same email', async () => {
    const firstUserParams: CreateUserDto = {
      firstName: 'John',
      lastName: 'Lennon',
      email: 'john.lennon@beatles.com',
      personalCode: '675.647.900-83',
      city: 'Merseyside',
      state: 'Liverpool',
    };
    const secondUserParams: CreateUserDto = {
      firstName: 'Elton',
      lastName: 'John',
      email: 'john.lennon@beatles.com',
      personalCode: '675.647.900-83',
      city: 'Merseyside',
      state: 'Liverpool',
    };
    expect(userService).toBeDefined();
    await userService.create(firstUserParams);
    const secondUser = await userService.create(secondUserParams);
    expect(secondUser).toBeUndefined();
  });

  it('should not create two users with cpf', async () => {
    const firstUserParams: CreateUserDto = {
      firstName: 'John',
      lastName: 'Lennon',
      email: 'john.lennon@beatles.com',
      personalCode: '675.647.900-83',
      city: 'Merseyside',
      state: 'Liverpool',
    };
    const secondUserParams: CreateUserDto = {
      firstName: 'Paul',
      lastName: 'Mccartney',
      email: 'paul.mccartney@beatles.com',
      personalCode: '675.647.900-83',
      city: 'Walton',
      state: 'Liverpool',
    };
    expect(userService).toBeDefined();
    await userService.create(firstUserParams);
    await userService.create(secondUserParams);
    const user = await userService.findByEmail(secondUserParams.email);
    expect(user).toBeNull();
  });

  it('should edit an user', async () => {
    const userParams: CreateUserDto = {
      firstName: 'John',
      lastName: 'Lennon',
      email: 'john.lennon@beatles.com',
      personalCode: '675.647.900-83',
      city: 'Walton',
      state: 'Liverpool',
    };
    const newParams: Partial<CreateUserDto> = {
      firstName: 'John',
      lastName: 'Lennon',
      city: 'Tottenham',
      state: 'London',
    };
    expect(userService).toBeDefined();
    await userService.create(userParams);
    let user = await userService.findByEmail(userParams.email);
    await userService.update(user.id, newParams);
    user = await userService.findByEmail(userParams.email);
    expect(user.city).toEqual(newParams.city);
    expect(user.state).toEqual(newParams.state);
  });

  it('should delete an user', async () => {
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
    let user = await userService.findByEmail(userParams.email);
    expect(user).toBeDefined();
    expect(user.email).toEqual(userParams.email);
    await userService.remove(user.id);
    user = await userService.findByEmail(userParams.email);
    expect(user).toBeNull();
  });
});
