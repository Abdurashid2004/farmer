import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMilkProductionDto } from './dto/create-milk_production.dto';
import { UpdateMilkProductionDto } from './dto/update-milk_production.dto';
import {
  MilkProduct,
  MilkProductDocument,
} from './schemas/milk_production.entity';

@Injectable()
export class MilkProductionService {
  constructor(
    @InjectModel(MilkProduct.name)
    private milkProductionModel: Model<MilkProductDocument>,
  ) {}

  async create(
    createMilkProductionDto: CreateMilkProductionDto,
  ): Promise<MilkProduct> {
    const createdMilkProduction = new this.milkProductionModel(
      createMilkProductionDto,
    );
    return await createdMilkProduction.save();
  }

  async findAll(): Promise<MilkProduct[]> {
    return await this.milkProductionModel.find();
  }

  async findOne(id: string): Promise<MilkProduct> {
    const milkProduction = await this.milkProductionModel.findById(id);
    if (!milkProduction) {
      throw new NotFoundException(`Milk production with ID ${id} not found`);
    }
    return milkProduction;
  }

  async update(
    id: string,
    updateMilkProductionDto: UpdateMilkProductionDto,
  ): Promise<MilkProduct> {
    return await this.milkProductionModel
      .findByIdAndUpdate({ id }, updateMilkProductionDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<void> {
    const result = await this.milkProductionModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Milk production with ID ${id} not found`);
    }
  }
}
