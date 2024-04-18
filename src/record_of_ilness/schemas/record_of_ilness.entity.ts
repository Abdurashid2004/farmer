import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Animal } from '../../animals/schemas/animal.schema';
import { Worker } from '../../worker/schemas/worker.schema';

export type RecordOfIlnessDocument = HydratedDocument<RecordOfIlness>;

@Schema()
export class RecordOfIlness {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'animal' }] })
  animal_id: Animal[];

  @Prop()
  ilness_type: string;

  @Prop()
  date_disease: Date;

  @Prop()
  medicines: string;

  @Prop()
  date_treatment: Date;

  @Prop()
  illness_photo: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'worker' }] })
  worker_id: Worker[];
}

export const RecordOfIlnessSchema =
  SchemaFactory.createForClass(RecordOfIlness);
