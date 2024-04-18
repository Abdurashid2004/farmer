import { Injectable } from '@nestjs/common';
import { CreateRecordsOfFeedingDto } from './dto/create-records_of_feeding.dto';
import { UpdateRecordsOfFeedingDto } from './dto/update-records_of_feeding.dto';

@Injectable()
export class RecordsOfFeedingService {
  create(createRecordsOfFeedingDto: CreateRecordsOfFeedingDto) {
    return 'This action adds a new recordsOfFeeding';
  }

  findAll() {
    return `This action returns all recordsOfFeeding`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recordsOfFeeding`;
  }

  update(id: number, updateRecordsOfFeedingDto: UpdateRecordsOfFeedingDto) {
    return `This action updates a #${id} recordsOfFeeding`;
  }

  remove(id: number) {
    return `This action removes a #${id} recordsOfFeeding`;
  }
}
