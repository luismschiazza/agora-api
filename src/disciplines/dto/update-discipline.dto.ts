import { IsOptional, IsString, MinLength } from 'class-validator';
import { IsUniqueName } from '../validators/unique-name.validator';

export class UpdateDisciplineDto {
  @IsOptional()
  @IsString()
  @IsUniqueName({ message: 'Discipline name already exists' })
  readonly name?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  readonly code?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  readonly description?: string;
}
