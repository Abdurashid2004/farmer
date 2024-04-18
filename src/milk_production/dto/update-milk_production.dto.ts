import { PartialType } from '@nestjs/mapped-types';
import { CreateMilkProductionDto } from './create-milk_production.dto';

export class UpdateMilkProductionDto extends PartialType(CreateMilkProductionDto) {}
