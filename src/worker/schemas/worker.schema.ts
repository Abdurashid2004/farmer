import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Speciality } from '../../specialist/schemas/specialist.schema';

export type WorkerDocument = HydratedDocument<Worker>;

@Schema()
export class Worker {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  phone: string;

  @Prop()
  exprience: string;

  @Prop()
  hashed_password: string;

  @Prop()
  email: string;

  @Prop({
    defaultValue: false,
  })
  is_active: boolean;

  @Prop()
  is_owner: boolean;

  @Prop()
  worker_schedule: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Speciality',
  })
  speciality_id: Speciality;

  @Prop()
  token: string;
}

export const WorkerSchema = SchemaFactory.createForClass(Worker);
