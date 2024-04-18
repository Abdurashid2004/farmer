import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Animal } from '../../animals/schemas/animal.schema';

export type MeatProductionDocument = HydratedDocument<MeatProduction>;

@Schema()
export class MeatProduction {
  @Prop()
  meat_yield: string;

  @Prop()
  meat_schedule: string[];

  @Prop()
  meat_quality: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'animal' }] })
  animal_id: Animal;
}

export const MeatProductionSchema =
  SchemaFactory.createForClass(MeatProduction);
