import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AnimalTypeDocument = HydratedDocument<AnimalType>;

@Schema()
export class AnimalType {
  @Prop()
  type_name: string;

  @Prop()
  description: string;
}

export const AnimalTypeSchema = SchemaFactory.createForClass(AnimalType);
