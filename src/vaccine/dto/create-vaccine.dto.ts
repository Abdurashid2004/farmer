import { IsString } from 'class-validator';

export class CreateVaccineDto {
  @IsString()
  type_name: string;

  @IsString()
  description: string;
}
