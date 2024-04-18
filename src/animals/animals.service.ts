import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Animal } from './schemas/animal.schema';
import { Model } from 'mongoose';

@Injectable()
export class AnimalsService {
  constructor(@InjectModel(Animal.name) private animalModel: Model<Animal>) {}
  async create(createAnimalDto: CreateAnimalDto) {
    const animal = await this.animalModel.create(createAnimalDto);
    return animal;
  }

  async findAll() {
    return this.animalModel.find().populate('animalType_id');
  }

  async findOne(id: string) {
    const animal = await this.animalModel.findOne({ id });
    if (!animal) {
      throw new NotFoundException(`Animal type with ID not found`);
    }
    return animal;
  }

  async update(id: string, updateAnimalDto: UpdateAnimalDto) {
    const animal = await this.animalModel.findByIdAndUpdate(
      { id },
      updateAnimalDto,
      { new: true },
    );
    if (!animal) {
      throw new NotFoundException(`Animal type with ID not found`);
    }
    return animal;
  }

  remove(id: string) {
    return this.animalModel.deleteOne({ _id: id });
  }
}
