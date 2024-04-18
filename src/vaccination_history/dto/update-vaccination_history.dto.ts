import { IsDateString, IsNumber, IsString } from 'class-validator';

export class UpdateVaccinationHistoryDto {
  @IsNumber()
  animal_id: number;

  @IsNumber()
  vaccine_id: number;

  @IsDateString()
  vaccinated_date: Date;

  @IsDateString()
  next_vaccinated_date: Date;

  @IsString()
  vaccination_photo: string;

  @IsNumber()
  worker_id: number;
}
