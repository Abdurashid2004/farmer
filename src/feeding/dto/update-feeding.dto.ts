import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedingDto } from './create-feeding.dto';

export class UpdateFeedingDto extends PartialType(CreateFeedingDto) {}
