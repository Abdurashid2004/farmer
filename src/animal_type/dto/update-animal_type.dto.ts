import { IsString } from 'class-validator';

export class UpdateAnimalTypeDto {
  @IsString()
  type_name: string;

  @IsString()
  description: string;
}
