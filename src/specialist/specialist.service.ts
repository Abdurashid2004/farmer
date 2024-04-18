import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpecialistDto } from './dto/create-specialist.dto';
import { UpdateSpecialistDto } from './dto/update-specialist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Speciality } from './schemas/specialist.schema';
import { Model } from 'mongoose';

@Injectable()
export class SpecialistService {
  constructor(
    @InjectModel(Speciality.name) private specModel: Model<Speciality>,
  ) {}
  async create(createSpecialistDto: CreateSpecialistDto) {
    const newSpecialist = await this.specModel.create(createSpecialistDto);
    if (!newSpecialist) {
      throw new Error('Failed to create new specialist');
    }
    return newSpecialist;
  }

  async findAll() {
    const allSpecialists = await this.specModel.find().populate('workers');
    if (!allSpecialists || allSpecialists.length === 0) {
      throw new NotFoundException('No specialists found');
    }
    return allSpecialists;
  }

  async findOne(id: string) {
    const specialist = await this.specModel.findById(id);
    if (!specialist) {
      throw new NotFoundException(`Specialist with ID ${id} not found`);
    }
    return specialist;
  }

  async update(id: string, updateSpecialistDto: UpdateSpecialistDto) {
    const updatedSpecialist = await this.specModel.findByIdAndUpdate(
      id,
      updateSpecialistDto,
      { new: true },
    );
    if (!updatedSpecialist) {
      throw new NotFoundException(`Specialist with ID ${id} not found`);
    }
    return updatedSpecialist;
  }

  async remove(id: string) {
    const removedSpecialist = await this.specModel.deleteOne({ _id: id });
    if (!removedSpecialist) {
      throw new NotFoundException(`Specialist with ID ${id} not found`);
    }
    return removedSpecialist;
  }
}
