import { IsNumber, IsString } from 'class-validator';

export class UpdateWorkerDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  phone: string;

  @IsString()
  exprience: string;

  @IsString()
  password: string;

  @IsString()
  confirm_password: string;

  @IsString()
  email: string;

  @IsString()
  worker_schedule: string[];

  @IsNumber()
  speciality_id: number;

  @IsString()
  token: string;
}
