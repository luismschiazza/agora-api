import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '@/features/auth/guards/jwt-auth.guard';
import { ResponseUserDto } from '../dtos/response/response-user.dto';
import { CreateUserDto } from '../dtos/validation/create-user.dto';
import { UpdateUserDto } from '../dtos/validation/update-user.dto';
import { ExcludeOwnUserGuard } from '../guards/exclude-own-user.guard';
import { NotOwnUserGuard } from '../guards/not-own-user.guard';
import { ValidateObjectIdPipe } from '../pipes/validate-object-id.pipe';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return plainToInstance(ResponseUserDto, req.user, { excludeExtraneousValues: true });
  }

  @UseGuards(JwtAuthGuard, ExcludeOwnUserGuard)
  @Get()
  async findAll(@Request() req) {
    return plainToInstance(ResponseUserDto, req.filteredUsers, { excludeExtraneousValues: true });
  }

  @UseGuards(JwtAuthGuard, NotOwnUserGuard)
  @Get(':id')
  async findOne(@Param('id', ValidateObjectIdPipe) id: string) {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return plainToInstance(ResponseUserDto, user, { excludeExtraneousValues: true });
  }

  @UseGuards(JwtAuthGuard, NotOwnUserGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.update(id, updateUserDto);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return plainToInstance(ResponseUserDto, user, { excludeExtraneousValues: true });
  }

  @UseGuards(JwtAuthGuard, NotOwnUserGuard)
  @Delete(':id')
  async delete(@Param('id', ValidateObjectIdPipe) id: string) {
    const user = await this.usersService.delete(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return plainToInstance(ResponseUserDto, user, { excludeExtraneousValues: true });
  }
}
