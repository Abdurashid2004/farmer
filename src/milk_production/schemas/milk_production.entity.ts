import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Animal } from '../../animals/schemas/animal.schema';

export type MilkProductDocument = HydratedDocument<MilkProduct>;

@Schema()
export class MilkProduct {
  @Prop()
  meat_yield: string;

  @Prop()
  slaughter_date: Date;

  @Prop()
  shearing_schedule: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'animal' }] })
  animal_id: Animal[];
}

export const MilkProductSchema = SchemaFactory.createForClass(MilkProduct);
