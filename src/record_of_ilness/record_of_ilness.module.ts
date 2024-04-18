import { Module } from '@nestjs/common';
import { RecordOfIlnessService } from './record_of_ilness.service';
import { RecordOfIlnessController } from './record_of_ilness.controller';
import {
  RecordOfIlness,
  RecordOfIlnessSchema,
} from './schemas/record_of_ilness.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RecordOfIlness.name, schema: RecordOfIlnessSchema },
    ]),
  ],
  controllers: [RecordOfIlnessController],
  providers: [RecordOfIlnessService],
})
export class RecordOfIlnessModule {}
