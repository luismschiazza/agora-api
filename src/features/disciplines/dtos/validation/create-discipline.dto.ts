import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDisciplineDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;
}
