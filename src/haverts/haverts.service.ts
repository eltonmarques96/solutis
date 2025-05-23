/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateHavertDto } from './dto/create-havert.dto';
import { UpdateHavertDto } from './dto/update-havert.dto';
import { FarmsService } from '../farms/farms.service';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { Havert } from './entities/havert.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HavertsService {
  constructor(
    @InjectRepository(Havert)
    private readonly harvestRespository: Repository<Havert>,
    private readonly userService: UsersService,
    private readonly farmService: FarmsService,
  ) {}
  async create(createHavertDto: CreateHavertDto) {
    const farm = await this.farmService.findOne(createHavertDto.farmId);
    if (!farm) {
      return;
    }
    createHavertDto = { ...createHavertDto, farm: farm };
    return await this.harvestRespository.save(createHavertDto);
  }

  async findAll() {
    return `This action returns all haverts`;
  }

  async findOne(id: string) {
    return this.harvestRespository.findOne({
      where: { id },
      relations: ['cultivations'],
    });
  }

  async update(id: number, updateHavertDto: UpdateHavertDto) {
    return `This action updates a #${id} havert`;
  }

  async remove(id: number) {
    return `This action removes a #${id} havert`;
  }
}
