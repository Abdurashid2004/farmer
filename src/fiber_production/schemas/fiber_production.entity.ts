import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Animal } from '../../animals/schemas/animal.schema';

export type FiberProductionDocument = HydratedDocument<FiberProduction>;

@Schema()
export class FiberProduction {
  @Prop()
  fiber_yield: string;

  @Prop()
  shearing_schedul: string[];

  @Prop()
  fiber_quality: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'animal' }] })
  animal_id: Animal;
}

export const FiberProductionSchema =
  SchemaFactory.createForClass(FiberProduction);
