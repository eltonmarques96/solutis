/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateCultivationDto } from './dto/create-cultivation.dto';
import { UpdateCultivationDto } from './dto/update-cultivation.dto';
import { HavertsService } from '../haverts/haverts.service';
import { FarmsService } from '../farms/farms.service';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { Cultivation } from './entities/cultivation.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CultivationsService {
  constructor(
    @InjectRepository(Cultivation)
    private readonly cultivationRespository: Repository<Cultivation>,
    private readonly userService: UsersService,
    private readonly farmService: FarmsService,
    private readonly harvestService: HavertsService,
  ) {}

  async create(createCultivationDto: CreateCultivationDto) {
    return await this.cultivationRespository.save(createCultivationDto);
  }

  findAll(id: string) {
    return this.cultivationRespository.findOne({
      where: { id },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} cultivation`;
  }

  update(id: number, updateCultivationDto: UpdateCultivationDto) {
    return `This action updates a #${id} cultivation`;
  }

  remove(id: number) {
    return `This action removes a #${id} cultivation`;
  }
}
