import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HavertsService } from './haverts.service';
import { CreateHavertDto } from './dto/create-havert.dto';
import { UpdateHavertDto } from './dto/update-havert.dto';

@Controller('haverts')
export class HavertsController {
  constructor(private readonly havertsService: HavertsService) {}

  @Post()
  create(@Body() createHavertDto: CreateHavertDto) {
    return this.havertsService.create(createHavertDto);
  }

  @Get()
  findAll() {
    return this.havertsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.havertsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHavertDto: UpdateHavertDto) {
    return this.havertsService.update(+id, updateHavertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.havertsService.remove(+id);
  }
}
