import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { IsUniqueEmail } from '../../validators/unique-email.validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'User name', example: 'John Doe' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'User email', example: 'john@example.com' })
  @IsOptional()
  @IsEmail()
  @IsUniqueEmail({ message: 'Email already in use' })
  email?: string;

  @ApiPropertyOptional({ description: 'User password', example: 'newPassword123' })
  @IsOptional()
  @IsString()
  password?: string;
}
