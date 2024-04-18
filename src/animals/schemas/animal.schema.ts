import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { AnimalType } from '../../animal_type/schemas/animal_type.schema';

export type AnimalDocument = HydratedDocument<Animal>;

@Schema()
export class Animal {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AnimalType',
  })
  animalType_id: AnimalType;

  @Prop()
  photo: string[];

  @Prop()
  unique: number;
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
