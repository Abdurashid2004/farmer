import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FeedingService } from './feeding.service';
import { CreateFeedingDto } from './dto/create-feeding.dto';
import { UpdateFeedingDto } from './dto/update-feeding.dto';

@Controller('feeding')
export class FeedingController {
  constructor(private readonly feedingService: FeedingService) {}

  @Post()
  create(@Body() createFeedingDto: CreateFeedingDto) {
    return this.feedingService.create(createFeedingDto);
  }

  @Get()
  findAll() {
    return this.feedingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedingDto: UpdateFeedingDto) {
    return this.feedingService.update(id, updateFeedingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedingService.remove(id);
  }
}
