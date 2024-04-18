import { Module } from '@nestjs/common';
import { MilkProductionService } from './milk_production.service';
import { MilkProductionController } from './milk_production.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MilkProduct,
  MilkProductSchema,
} from './schemas/milk_production.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MilkProduct.name, schema: MilkProductSchema },
    ]),
  ],
  controllers: [MilkProductionController],
  providers: [MilkProductionService],
})
export class MilkProductionModule {}
