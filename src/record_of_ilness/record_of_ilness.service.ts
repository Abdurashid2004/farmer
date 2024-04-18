import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecordOfIlnessDto } from './dto/create-record_of_ilness.dto';
import { UpdateRecordOfIlnessDto } from './dto/update-record_of_ilness.dto';
import {
  RecordOfIlness,
  RecordOfIlnessDocument,
} from './schemas/record_of_ilness.entity';

@Injectable()
export class RecordOfIlnessService {
  constructor(
    @InjectModel(RecordOfIlness.name)
    private recordOfIlnessModel: Model<RecordOfIlnessDocument>,
  ) {}

  async create(
    createRecordOfIlnessDto: CreateRecordOfIlnessDto,
  ): Promise<RecordOfIlness> {
    const createdRecordOfIlness = new this.recordOfIlnessModel(
      createRecordOfIlnessDto,
    );
    return await createdRecordOfIlness.save();
  }

  async findAll(): Promise<RecordOfIlness[]> {
    return await this.recordOfIlnessModel.find();
  }

  async findOne(id: string): Promise<RecordOfIlness> {
    return await this.recordOfIlnessModel.findById(id);
  }

  async update(
    id: string,
    updateRecordOfIlnessDto: UpdateRecordOfIlnessDto,
  ): Promise<RecordOfIlness> {
    return await this.recordOfIlnessModel.findByIdAndUpdate(
      { id },
      updateRecordOfIlnessDto,
      { new: true },
    );
  }

  async remove(id: string): Promise<RecordOfIlness> {
    return await this.recordOfIlnessModel.findOneAndDelete({ id });
  }
}
