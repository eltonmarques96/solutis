export class CreateUserDto {
  readonly id?: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly personalCode: string;
  readonly city: string;
  readonly state: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}
