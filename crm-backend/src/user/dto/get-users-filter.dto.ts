import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class GetUsersFilterDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  skip: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  minAge: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  maxAge: number;

  @IsOptional()
  @IsString()
  balance: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  company: string;
}
