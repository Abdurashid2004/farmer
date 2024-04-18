import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFeedingDto } from './dto/create-feeding.dto';
import { UpdateFeedingDto } from './dto/update-feeding.dto';
import { Feeding, FeedingDocument } from './schemas/feeding.entity';

@Injectable()
export class FeedingService {
  constructor(
    @InjectModel(Feeding.name) private feedingModel: Model<FeedingDocument>,
  ) {}

  async create(createFeedingDto: CreateFeedingDto): Promise<Feeding> {
    const createdFeeding = new this.feedingModel(createFeedingDto);
    return await createdFeeding.save();
  }

  async findAll(): Promise<Feeding[]> {
    return await this.feedingModel.find();
  }

  async findOne(id: string): Promise<Feeding> {
    return await this.feedingModel.findById(id);
  }

  async update(
    id: string,
    updateFeedingDto: UpdateFeedingDto,
  ): Promise<Feeding> {
    return await this.feedingModel
      .findByIdAndUpdate(id, { updateFeedingDto }, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Feeding> {
    return await this.feedingModel.findOneAndDelete({ id });
  }
}
