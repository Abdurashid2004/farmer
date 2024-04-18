import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVaccinationHistoryDto } from './dto/create-vaccination_history.dto';
import { UpdateVaccinationHistoryDto } from './dto/update-vaccination_history.dto';
import { InjectModel } from '@nestjs/mongoose';
import { VaccinationHistory } from './schemas/vaccination_history.schema';
import { Model } from 'mongoose';

@Injectable()
export class VaccinationHistoryService {
  constructor(
    @InjectModel(VaccinationHistory.name)
    private vacHistoryModel: Model<VaccinationHistory>,
  ) {}
  async create(createVaccinationHistoryDto: CreateVaccinationHistoryDto) {
    const newVaccinationHistory = await this.vacHistoryModel.create(
      createVaccinationHistoryDto,
    );

    if (!newVaccinationHistory) {
      throw new Error('Failed to create new vaccination history');
    }

    return newVaccinationHistory;
  }

  async findAll() {
    const allVaccinationHistory = await this.vacHistoryModel
      .find()
      .populate('animal_id', 'vaccine_id', 'worker_id');

    if (!allVaccinationHistory || allVaccinationHistory.length === 0) {
      throw new NotFoundException('No vaccination history found');
    }
  }

  async findOne(id: string) {
    const vaccinationHistory = await this.vacHistoryModel.findOne({
      id,
    });

    if (!vaccinationHistory) {
      throw new NotFoundException(
        `Vaccination history with ID ${id} not found`,
      );
    }
    return vaccinationHistory;
  }

  async update(
    id: string,
    updateVaccinationHistoryDto: UpdateVaccinationHistoryDto,
  ) {
    const updatedVaccinationHistory =
      await this.vacHistoryModel.findOneAndUpdate(
        { id },
        updateVaccinationHistoryDto,
        { new: true },
      );
    if (!updatedVaccinationHistory) {
      throw new NotFoundException(
        `Vaccination history with ID ${id} not found`,
      );
    }
    return updatedVaccinationHistory;
  }

  async remove(id: string) {
    const removedVaccinationHistory = await this.vacHistoryModel.deleteOne({
      _id: id,
    });
    if (!removedVaccinationHistory) {
      throw new NotFoundException(
        `Vaccination history with ID ${id} not found`,
      );
    }
    return removedVaccinationHistory;
  }
}
