import {
  Controller,
  Post,
  Body,
  UsePipes,
  UseGuards,
  Get,
  Param,
  Patch,
  Delete,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { DisciplinesService } from './disciplines.service';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ManageDisciplines } from './guards/manage-disciplines.guard';
import { ValidateDisciplineCodePipe } from './pipes/validate-object-code.pipe';
import { ValidateObjectIdPipe } from './pipes/validate-object-id.pipe';

@Controller('disciplines')
export class DisciplinesController {
  constructor(private readonly disciplinesService: DisciplinesService) {}

  @UseGuards(JwtAuthGuard, ManageDisciplines)
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createDisciplineDto: CreateDisciplineDto) {
    return this.disciplinesService.create(createDisciplineDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.disciplinesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ValidateObjectIdPipe) id: string) {
    const discipline = await this.disciplinesService.findOne(id);
    if (!discipline) {
      throw new NotFoundException(`Discipline with ID ${id} not found`);
    }
    return discipline;
  }

  @UseGuards(JwtAuthGuard)
  @Get('code/:code')
  async findByCode(@Param('code', ValidateDisciplineCodePipe) code: string) {
    const discipline = await this.disciplinesService.findByCode(code);
    if (!discipline) {
      throw new NotFoundException(`Discipline with code ${code} not found`);
    }
    return discipline;
  }

  @UseGuards(JwtAuthGuard, ManageDisciplines)
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body() updateDisciplineDto: UpdateDisciplineDto,
  ) {
    const discipline = await this.disciplinesService.update(
      id,
      updateDisciplineDto,
    );
    if (!discipline) {
      throw new NotFoundException(`Discipline with ID ${id} not found`);
    }
    return discipline;
  }

  @UseGuards(JwtAuthGuard, ManageDisciplines)
  @Delete(':id')
  async delete(@Param('id', ValidateObjectIdPipe) id: string) {
    const result = await this.disciplinesService.remove(id);
    if (!result) {
      throw new NotFoundException(`Discipline with ID ${id} not found`);
    }
    return result;
  }
}
