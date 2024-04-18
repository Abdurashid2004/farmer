import { IsString } from 'class-validator';

export class CreateAnimalTypeDto {
  @IsString()
  type_name: string;

  @IsString()
  description: string;
}
