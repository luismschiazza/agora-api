import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { LoginRequestDto } from '../dtos/validation/login-request.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() _loginDto: LoginRequestDto, @Request() req) {
    return this.authService.login(req.user);
  }
}
