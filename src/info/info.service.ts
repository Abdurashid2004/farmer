import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { Info, InfoDocument } from './schemas/info.entity';

@Injectable()
export class InfoService {
  constructor(@InjectModel(Info.name) private infoModel: Model<InfoDocument>) {}

  async create(createInfoDto: CreateInfoDto): Promise<Info> {
    const createdInfo = new this.infoModel(createInfoDto);
    return await createdInfo.save();
  }

  async findAll(): Promise<Info[]> {
    return await this.infoModel.find().populate('animal');
  }

  async findOne(id: string): Promise<Info> {
    return await this.infoModel.findById(id);
  }

  async update(id: string, updateInfoDto: UpdateInfoDto): Promise<Info> {
    return await this.infoModel.findByIdAndUpdate({ id }, updateInfoDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<Info> {
    return await this.infoModel.findOneAndDelete({ id });
  }
}
