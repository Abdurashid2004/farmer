import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Animal } from '../../animals/schemas/animal.schema';

export type FeedingDocument = HydratedDocument<Feeding>;

@Schema()
export class Feeding {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'animal' }] })
  animal_id: Animal;

  @Prop()
  feeding_schedule: string[];

  @Prop()
  types_of_feed: string;

  @Prop()
  dietary: string;

  @Prop()
  worker_id: number;
}

export const FeedingSchema = SchemaFactory.createForClass(Feeding);
