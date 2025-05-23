import { Havert } from '../../haverts/entities/havert.entity';

export class CreateCultivationDto {
  name: string;
  harvestId: string;
  harvest?: Havert;
}
