import { IsNumber, IsString } from 'class-validator';

export class UpdateAnimalDto {
  @IsNumber()
  animalType_id: number;

  @IsString()
  photo: string[];

  @IsNumber()
  unique: number;
}
