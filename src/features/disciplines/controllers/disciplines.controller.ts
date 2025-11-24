import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '@/features/auth/guards/jwt-auth.guard';
import { ValidateObjectIdPipe } from '@/features/users/pipes/validate-object-id.pipe';
import { ResponseDisciplineDto } from '../dtos/response/response-discipline.dto';
import { CreateDisciplineDto } from '../dtos/validation/create-discipline.dto';
import { UpdateDisciplineDto } from '../dtos/validation/update-discipline.dto';
import { DisciplinesService } from '../services/disciplines.service';

@Controller('disciplines')
export class DisciplinesController {
  constructor(private readonly disciplinesService: DisciplinesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createDisciplineDto: CreateDisciplineDto) {
    const discipline = await this.disciplinesService.create(createDisciplineDto);
    return plainToInstance(ResponseDisciplineDto, discipline, {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const disciplines = await this.disciplinesService.findAll();
    return plainToInstance(ResponseDisciplineDto, disciplines, {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ValidateObjectIdPipe) id: string) {
    const discipline = await this.disciplinesService.findOneById(id);
    if (!discipline) {
      throw new NotFoundException(`Discipline with ID ${id} not found`);
    }
    return plainToInstance(ResponseDisciplineDto, discipline, {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body() updateDisciplineDto: UpdateDisciplineDto,
  ) {
    const discipline = await this.disciplinesService.update(id, updateDisciplineDto);
    if (!discipline) {
      throw new NotFoundException(`Discipline with ID ${id} not found`);
    }
    return plainToInstance(ResponseDisciplineDto, discipline, {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', ValidateObjectIdPipe) id: string) {
    const deleted = await this.disciplinesService.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Discipline with ID ${id} not found`);
    }
    return plainToInstance(ResponseDisciplineDto, deleted, {
      excludeExtraneousValues: true,
    });
  }
}
