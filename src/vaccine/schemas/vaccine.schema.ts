import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type VaccineDocument = HydratedDocument<Vaccine>;

@Schema()
export class Vaccine {
  @Prop()
  vaccine_name: string;

  @Prop()
  description: string;
}

export const VaccineSchema = SchemaFactory.createForClass(Vaccine);
