import { IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';
import { IsUniqueName } from '../validators/unique-name.validator';

export class CreateDisciplineDto {
  @IsNotEmpty()
  @IsString()
  @IsUniqueName({ message: 'Discipline name already exits' })
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  code?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  description?: string;
}
