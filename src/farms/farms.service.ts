/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Farm } from './entities/farm.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class FarmsService {
  constructor(
    @InjectRepository(Farm) private readonly farmRepository: Repository<Farm>,
    private readonly userService: UsersService,
  ) {}

  async create(createFarmDto: CreateFarmDto): Promise<Farm> {
    const user = await this.userService.findOne(createFarmDto.userId);
    createFarmDto = { ...createFarmDto, user: user[0] };
    return await this.farmRepository.save(createFarmDto);
  }

  async findAll() {
    return `This action returns all farms`;
  }

  async findOne(id: string) {
    return this.farmRepository.findBy({ id });
  }

  async update(id: number, updateFarmDto: UpdateFarmDto) {
    return `This action updates a #${id} farm`;
  }

  async remove(id: number) {
    return `This action removes a #${id} farm`;
  }
}
