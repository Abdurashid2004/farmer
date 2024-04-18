import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnimalTypeService } from './animal_type.service';
import { CreateAnimalTypeDto } from './dto/create-animal_type.dto';
import { UpdateAnimalTypeDto } from './dto/update-animal_type.dto';

@Controller('animal-type')
export class AnimalTypeController {
  constructor(private readonly animalTypeService: AnimalTypeService) {}

  @Post()
  create(@Body() createAnimalTypeDto: CreateAnimalTypeDto) {
    return this.animalTypeService.create(createAnimalTypeDto);
  }

  @Get()
  findAll() {
    return this.animalTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalTypeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimalTypeDto: UpdateAnimalTypeDto) {
    return this.animalTypeService.update(id, updateAnimalTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalTypeService.remove(id);
  }
}
