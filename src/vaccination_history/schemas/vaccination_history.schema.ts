import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Animal } from '../../animals/schemas/animal.schema';
import { Vaccine } from '../../vaccine/schemas/vaccine.schema';
import { Worker } from '../../worker/schemas/worker.schema';

export type VaccinationHistoryDocument = HydratedDocument<VaccinationHistory>;

@Schema()
export class VaccinationHistory {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal',
  })
  animal_id: Animal;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vaccine',
  })
  vaccine_id: Vaccine;

  @Prop()
  vaccinated_date: Date;

  @Prop()
  next_vaccinated_date: Date;

  @Prop()
  vaccination_photo: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
  })
  worker_id: Worker;
}

export const VaccinationHistorySchema =
  SchemaFactory.createForClass(VaccinationHistory);
