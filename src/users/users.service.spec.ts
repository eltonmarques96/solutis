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
    };
    await userService.create(userParams);
    const user = await userService.findByEmail(userParams.email);
    expect(userService).toBeDefined();
    expect(user[0].email).toEqual(userParams.email);
  });
});
