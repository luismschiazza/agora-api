import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    example: 'developer@example.com',
    description: 'User email for authentication',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'dev123',
    description: 'User password for authentication',
  })
  @IsNotEmpty()
  password: string;
}
