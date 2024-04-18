import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFiberProductionDto } from './dto/create-fiber_production.dto';
import { UpdateFiberProductionDto } from './dto/update-fiber_production.dto';
import {
  FiberProduction,
  FiberProductionDocument,
} from './schemas/fiber_production.entity';

@Injectable()
export class FiberProductionService {
  constructor(
    @InjectModel(FiberProduction.name)
    private fiberProductionModel: Model<FiberProductionDocument>,
  ) {}

  async create(
    createFiberProductionDto: CreateFiberProductionDto,
  ): Promise<FiberProduction> {
    const createdFiberProduction = new this.fiberProductionModel(
      createFiberProductionDto,
    );
    return await createdFiberProduction.save();
  }

  async findAll(): Promise<FiberProduction[]> {
    return this.fiberProductionModel.find();
  }

  async findOne(id: string): Promise<FiberProduction> {
    return this.fiberProductionModel.findById(id);
  }

  async update(
    id: string,
    updateFiberProductionDto: UpdateFiberProductionDto,
  ): Promise<FiberProduction> {
    return this.fiberProductionModel.findByIdAndUpdate(
      { id },
      updateFiberProductionDto,
      { new: true },
    );
  }

  async remove(id: string): Promise<FiberProduction> {
    return this.fiberProductionModel.findOneAndDelete({ id });
  }
}
