import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VaccinationHistoryService } from './vaccination_history.service';
import { CreateVaccinationHistoryDto } from './dto/create-vaccination_history.dto';
import { UpdateVaccinationHistoryDto } from './dto/update-vaccination_history.dto';

@Controller('vaccination-history')
export class VaccinationHistoryController {
  constructor(private readonly vaccinationHistoryService: VaccinationHistoryService) {}

  @Post()
  create(@Body() createVaccinationHistoryDto: CreateVaccinationHistoryDto) {
    return this.vaccinationHistoryService.create(createVaccinationHistoryDto);
  }

  @Get()
  findAll() {
    return this.vaccinationHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaccinationHistoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVaccinationHistoryDto: UpdateVaccinationHistoryDto) {
    return this.vaccinationHistoryService.update(id, updateVaccinationHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vaccinationHistoryService.remove(id);
  }
}
