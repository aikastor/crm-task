import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  isActive: boolean;
  balance: string;

  @IsNotEmpty()
  age: number;
  eyeColor: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  gender: string;
  company: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;

  address: string;
}
