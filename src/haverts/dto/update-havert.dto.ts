import { PartialType } from '@nestjs/swagger';
import { CreateHavertDto } from './create-havert.dto';

export class UpdateHavertDto extends PartialType(CreateHavertDto) {}
