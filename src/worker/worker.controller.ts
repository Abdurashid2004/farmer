import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
} from '@nestjs/common';
import { WorkerService } from './worker.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { Response } from 'express';
import { LoginWorkerDto } from './dto/login-worker.dto';

@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Post('signup')
  regstration(
    @Body() createPatientDto: CreateWorkerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.workerService.register(createPatientDto, res);
  }

  @HttpCode(200)
  @Post('login')
  login(
    @Body() loginAdminDto: LoginWorkerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.workerService.login(loginAdminDto, res);
  }

  @Post()
  create(@Body() createWorkerDto: CreateWorkerDto) {
    return this.workerService.create(createWorkerDto);
  }

  @Get()
  findAll() {
    return this.workerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkerDto: UpdateWorkerDto) {
    return this.workerService.update(id, updateWorkerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workerService.remove(id);
  }
}
