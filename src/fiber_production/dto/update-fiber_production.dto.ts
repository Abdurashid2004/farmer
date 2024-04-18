import { PartialType } from '@nestjs/mapped-types';
import { CreateFiberProductionDto } from './create-fiber_production.dto';

export class UpdateFiberProductionDto extends PartialType(CreateFiberProductionDto) {}
