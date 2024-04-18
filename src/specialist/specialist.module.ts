import { Module } from '@nestjs/common';
import { SpecialistService } from './specialist.service';
import { SpecialistController } from './specialist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Speciality, SpecialitySchema } from './schemas/specialist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Speciality.name, schema: SpecialitySchema },
    ]),
  ],
  controllers: [SpecialistController],
  providers: [SpecialistService],
})
export class SpecialistModule {}
