import { User } from '../../users/entities/user.entity';

export class CreateFarmDto {
  name: string;
  totalArea: number;
  areableArea?: number;
  vegetationArea?: number;
  userId?: string;
  user?: User;
}
