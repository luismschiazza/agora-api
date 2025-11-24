import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IsUniqueEmail } from '../../validators/unique-email.validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsUniqueEmail({ message: 'Email already in use' })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
