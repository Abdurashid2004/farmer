import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMeatProductionDto } from './dto/create-meat_production.dto';
import { UpdateMeatProductionDto } from './dto/update-meat_production.dto';
import {
  MeatProduction,
  MeatProductionDocument,
} from './schemas/meat_production.entity';

@Injectable()
export class MeatProductionService {
  constructor(
    @InjectModel(MeatProduction.name)
    private meatProductionModel: Model<MeatProductionDocument>,
  ) {}

  async create(
    createMeatProductionDto: CreateMeatProductionDto,
  ): Promise<MeatProduction> {
    const createdMeatProduction = new this.meatProductionModel(
      createMeatProductionDto,
    );
    return await createdMeatProduction.save();
  }

  async findAll(): Promise<MeatProduction[]> {
    return await this.meatProductionModel.find().populate('animal');
  }

  async findOne(id: string): Promise<MeatProduction> {
    return await this.meatProductionModel.findById(id);
  }

  async update(
    id: string,
    updateMeatProductionDto: UpdateMeatProductionDto,
  ): Promise<MeatProduction> {
    return await this.meatProductionModel.findByIdAndUpdate(
      { id },
      updateMeatProductionDto,
      { new: true },
    );
  }

  async remove(id: string): Promise<MeatProduction> {
    return await this.meatProductionModel.findOneAndDelete({ id });
  }
}
