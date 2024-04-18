import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Worker } from '../../worker/schemas/worker.schema';

export type SpecialityDocument = HydratedDocument<Speciality>;

@Schema()
export class Speciality {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'Worker' }] })
  workers: Worker[];
}

export const SpecialitySchema = SchemaFactory.createForClass(Speciality);
