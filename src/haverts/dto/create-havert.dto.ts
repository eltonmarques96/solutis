import { Farm } from '../../farms/entities/farm.entity';

export class CreateHavertDto {
  name: string;
  farmId: string;
  farm?: Farm;
}
