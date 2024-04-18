import { PartialType } from '@nestjs/mapped-types';
import { CreateMeatProductionDto } from './create-meat_production.dto';

export class UpdateMeatProductionDto extends PartialType(CreateMeatProductionDto) {}
