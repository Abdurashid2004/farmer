import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Vaccine } from './schemas/vaccine.schema';
import { Model } from 'mongoose';

@Injectable()
export class VaccineService {
  constructor(
    @InjectModel(Vaccine.name) private vaccineModel: Model<Vaccine>,
  ) {}
  async create(createVaccineDto: CreateVaccineDto) {
    const vaccine = await this.vaccineModel.create(createVaccineDto);
    return vaccine;
  }

  async findAll() {
    return this.vaccineModel.find();
  }

  async findOne(id: string) {
    const vaccine = await this.vaccineModel.findById(id);
    if (!vaccine) {
      throw new BadRequestException('There is such vaccine');
    }
    return vaccine;
  }

  async update(id: string, updateVaccineDto: UpdateVaccineDto) {
    const vaccine = await this.vaccineModel.findByIdAndUpdate(
      { id },
      updateVaccineDto,
      { new: true },
    );
    if (!vaccine) {
      throw new BadRequestException('There is such vaccine');
    }
    return vaccine;
  }

  async remove(id: string) {
    const vaccine = await this.vaccineModel.deleteOne({ _id: id });
    if (!vaccine) {
      throw new BadRequestException('There is such vaccine');
    }
    return vaccine;
  }
}
