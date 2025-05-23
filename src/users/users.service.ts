/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    try {
      const checkUser = await this.userRepository.findBy({
        email: createUserDto.email,
      });
      if (checkUser.length > 0) {
        return;
      }
      const secondCheckUser = await this.userRepository.findBy({
        personalCode: createUserDto.personalCode,
      });
      if (secondCheckUser.length > 0) {
        return;
      }
      const createdUser = await this.userRepository.save(createUserDto);
      return createdUser;
    } catch (error) {
      return error;
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return this.userRepository.findBy({ id });
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        relations: ['farms'],
      });
      return user;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateUserDto: Partial<UpdateUserDto>) {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOneBy({ id: updateUserDto.id });
  }

  async remove(id: number) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return 'ok';
  }
}
