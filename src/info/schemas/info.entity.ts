import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Animal } from '../../animals/schemas/animal.schema';
import { Block } from '../../blocks/entities/block.entity';

export type InfoDocument = HydratedDocument<Info>;

@Schema()
export class Info {
  @Prop()
  weight: number;

  @Prop()
  color: string;

  @Prop()
  height: number;

  @Prop()
  breed: string;

  @Prop()
  gender: string;

  @Prop()
  birth_or_acquisition: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'block' }] })
  block_id: Block[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'animal' }] })
  animal_id: Animal[];
}

export const InfoSchema = SchemaFactory.createForClass(Info);
