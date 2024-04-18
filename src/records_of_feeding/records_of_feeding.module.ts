import { Module } from '@nestjs/common';
import { RecordsOfFeedingService } from './records_of_feeding.service';
import { RecordsOfFeedingController } from './records_of_feeding.controller';

@Module({
  controllers: [RecordsOfFeedingController],
  providers: [RecordsOfFeedingService],
})
export class RecordsOfFeedingModule {}
