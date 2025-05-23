import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Res() response: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    const user = await this.usersService.create(createUserDto);
    return response.status(201).json(user);
  }

  @Get()
  async findAll(@Res() response: Response) {
    const users = await this.usersService.findAll();
    return response.status(200).json(users);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    const user = await this.usersService.findOne(id);
    return response.status(200).json(user);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response,
  ) {
    const user = await this.usersService.update(id, updateUserDto);
    return response.status(200).json(user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    await this.usersService.remove(+id);
    return response.status(200).json({ data: 'ok' });
  }
}
