import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CultivationsService } from './cultivations.service';
import { CreateCultivationDto } from './dto/create-cultivation.dto';
import { UpdateCultivationDto } from './dto/update-cultivation.dto';

@Controller('cultivations')
export class CultivationsController {
  constructor(private readonly cultivationsService: CultivationsService) {}

  @Post()
  create(@Body() createCultivationDto: CreateCultivationDto) {
    return this.cultivationsService.create(createCultivationDto);
  }

  @Get()
  findAll(id: string) {
    return this.cultivationsService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cultivationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCultivationDto: UpdateCultivationDto,
  ) {
    return this.cultivationsService.update(+id, updateCultivationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cultivationsService.remove(+id);
  }
}
