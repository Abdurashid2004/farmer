import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecordOfIlnessService } from './record_of_ilness.service';
import { CreateRecordOfIlnessDto } from './dto/create-record_of_ilness.dto';
import { UpdateRecordOfIlnessDto } from './dto/update-record_of_ilness.dto';

@Controller('record-of-ilness')
export class RecordOfIlnessController {
  constructor(private readonly recordOfIlnessService: RecordOfIlnessService) {}

  @Post()
  create(@Body() createRecordOfIlnessDto: CreateRecordOfIlnessDto) {
    return this.recordOfIlnessService.create(createRecordOfIlnessDto);
  }

  @Get()
  findAll() {
    return this.recordOfIlnessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordOfIlnessService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecordOfIlnessDto: UpdateRecordOfIlnessDto,
  ) {
    return this.recordOfIlnessService.update(id, updateRecordOfIlnessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordOfIlnessService.remove(id);
  }
}
