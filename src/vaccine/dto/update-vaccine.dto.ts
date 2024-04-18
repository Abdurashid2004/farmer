import { IsString } from 'class-validator';

export class UpdateVaccineDto {
  @IsString()
  type_name: string;

  @IsString()
  description: string;
}
