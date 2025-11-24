import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateDisciplineDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly name?: string;
}
