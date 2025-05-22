import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { FarmsService } from '../src/farms/farms.service';
import { UsersService } from '../src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from '../src/config/typeorm.config';
import { User } from '../src/users/entities/user.entity';
import { Farm } from '../src/farms/entities/farm.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [FarmsService, UsersService],
      imports: [
        AppModule,
        TypeOrmModule.forRoot(getTypeOrmConfig()),
        TypeOrmModule.forFeature([User, Farm]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
