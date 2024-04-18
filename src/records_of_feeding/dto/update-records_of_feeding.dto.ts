import { PartialType } from '@nestjs/mapped-types';
import { CreateRecordsOfFeedingDto } from './create-records_of_feeding.dto';

export class UpdateRecordsOfFeedingDto extends PartialType(CreateRecordsOfFeedingDto) {}
