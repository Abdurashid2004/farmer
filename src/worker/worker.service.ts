import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Speciality } from '../specialist/schemas/specialist.schema';
import { Worker, WorkerDocument } from './schemas/worker.schema';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginWorkerDto } from './dto/login-worker.dto';

@Injectable()
export class WorkerService {
  constructor(
    @InjectModel(Worker.name) private wokerModel: Model<Worker>,
    @InjectModel(Speciality.name) private specModel: Model<Speciality>,
    private readonly jwtService: JwtService,
  ) {}

  async getTokens(worker: WorkerDocument) {
    const payload = {
      id: worker._id,
      is_active: worker.is_active,
      is_owner: worker.is_owner,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  //////////////////////////// Regstration ///////////////////////////

  async register(createWorkerDto: CreateWorkerDto, res: Response) {
    const worker = await this.wokerModel.findOne({
      email: createWorkerDto.email,
    });
    if (worker) {
      throw new BadRequestException('There is such worker');
    }
    if (createWorkerDto.password !== createWorkerDto.confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashed_password = await bcrypt.hash(createWorkerDto.password, 7);
    const newWorker = await this.wokerModel.create({
      ...createWorkerDto,
      hashed_password,
    });
    const tokens = await this.getTokens(newWorker);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedWorker = await this.wokerModel.findByIdAndUpdate(
      newWorker._id,
      {
        hashed_refresh_token,
      },
      { new: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Worker logged in',
      user: updatedWorker,
      tokens,
    };
    return response;
  }

  ////////////////////////// login ///////////////////////////////
  async login(loginWorkerDto: LoginWorkerDto, res: Response) {
    const { email, password } = loginWorkerDto;
    const worker = await this.wokerModel.findOne({ email });
    if (!worker) {
      throw new BadRequestException('There is such Worker');
    }
    if (!worker.is_active) {
      throw new BadRequestException('Worker not active');
    }
    const isMatchPass = await bcrypt.compare(password, worker.hashed_password);

    if (!isMatchPass) {
      throw new BadRequestException('Password do not match');
    }
    const tokens = await this.getTokens(worker);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updateWorker = await this.wokerModel.findByIdAndUpdate(
      worker._id,
      {
        hashed_refresh_token,
      },
      { new: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 10 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'admin logged in',
      admin: updateWorker,
      tokens,
    };

    return response;
  }

  async create(createWorkerDto: CreateWorkerDto) {
    const { speciality_id } = createWorkerDto;
    const spec = await this.specModel.findById(speciality_id);

    if (!spec) {
      throw new BadRequestException('Not Found Spec');
    }

    const worker = await this.wokerModel.create(createWorkerDto);
    spec.workers.push(worker);
    await spec.save();
    return worker;
  }

  async findAll() {
    return this.wokerModel.find().populate('speciality_id');
  }

  async findOne(id: string) {
    const worker = await this.wokerModel.findById(id);
    if (!worker) {
      throw new BadRequestException('There is such worker');
    }
    return worker;
  }

  async update(id: string, updateWorkerDto: UpdateWorkerDto) {
    const worker = await this.wokerModel.findByIdAndUpdate(
      { id },
      updateWorkerDto,
      { new: true },
    );
    if (!worker) {
      throw new BadRequestException('There is such worker');
    }
    return worker;
  }

  async remove(id: string) {
    const worker = await this.wokerModel.deleteOne({ _id: id });
    if (!worker) {
      throw new BadRequestException('There is such worker');
    }
    return worker;
  }
}
