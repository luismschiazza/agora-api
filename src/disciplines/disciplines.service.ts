import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';
import { Discipline } from './interfaces/discipline.interface';

@Injectable()
export class DisciplinesService {
  constructor(
    @InjectModel('Discipline')
    private readonly disciplineModel: Model<Discipline>,
  ) {}

  async create(CreateDisciplineDto: CreateDisciplineDto): Promise<Discipline> {
    const created = new this.disciplineModel(CreateDisciplineDto);
    return created.save();
  }

  async findAll(): Promise<Discipline[]> {
    return this.disciplineModel.find().exec();
  }

  async findOne(id: string): Promise<Discipline> {
    const discipline = await this.disciplineModel.findById(id).exec();

    if (!discipline) {
      throw new NotFoundException(`Discipline with id "${id}" not found`);
    }

    return discipline;
  }

  async update(
    id: string,
    updateDisciplineDto: UpdateDisciplineDto,
  ): Promise<Discipline> {
    const updated = await this.disciplineModel
      .findByIdAndUpdate(id, updateDisciplineDto, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`Discipline with id "${id}" not found`);
    }

    return updated;
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const deleted = await this.disciplineModel.findByIdAndDelete(id).exec();

    if (!deleted) {
      throw new NotFoundException(`Discipline with id "${id}" not found`);
    }

    return { deleted: true };
  }

  // HELPERS FOR VALIDATORS

  async findByName(name: string): Promise<Discipline | null> {
    return this.disciplineModel.findOne({ name }).exec();
  }

  async findByCode(code: string): Promise<Discipline | null> {
    return this.disciplineModel.findOne({ code }).exec();
  }
}
