import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IsUniqueEmail } from '../../validators/unique-email.validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Unique email for the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsUniqueEmail({ message: 'Email already in use' })
  email: string;

  @ApiProperty({
    description: 'Password of the user (minimum 6 characters)',
    example: 'mysecret123',
    minLength: 6,
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
