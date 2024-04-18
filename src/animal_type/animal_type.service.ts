import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAnimalTypeDto } from './dto/create-animal_type.dto';
import { UpdateAnimalTypeDto } from './dto/update-animal_type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnimalType } from './schemas/animal_type.schema';

@Injectable()
export class AnimalTypeService {
  constructor(
    @InjectModel(AnimalType.name) private animalTypeModel: Model<AnimalType>,
  ) {}
  async create(createAnimalTypeDto: CreateAnimalTypeDto) {
    const animal_type = await this.animalTypeModel.findOne({
      type_name: createAnimalTypeDto.type_name,
    });
    if (!animal_type) {
      throw new NotFoundException('Animal type not found');
    }
    const createdAnimalType =
      await this.animalTypeModel.create(createAnimalTypeDto);
    return createdAnimalType;
  }

  async findAll() {
    const allAnimalTypes = await this.animalTypeModel.find();

    if (!allAnimalTypes || allAnimalTypes.length === 0) {
      throw new NotFoundException('Animal types not found');
    }

    return allAnimalTypes;
  }

  async findOne(id: string) {
    const animalType = await this.animalTypeModel.findOne({ id });
    if (!animalType) {
      throw new NotFoundException(`Animal type with ID ${id} not found`);
    }
    return animalType;
  }

  async update(id: string, updateAnimalTypeDto: UpdateAnimalTypeDto) {
    const animal_type = await this.animalTypeModel.findByIdAndUpdate(
      { id },
      updateAnimalTypeDto,
      { new: true },
    );
    if (!animal_type) {
      throw new NotFoundException(`Animal type with ID not found`);
    }
    return animal_type;
  }

  async remove(id: string) {
    const animal_type = await this.animalTypeModel.deleteOne({ _id: id });
    if (animal_type) {
      throw new NotFoundException(`Animal type with ID not found`);
    }
    return animal_type;
  }
}
