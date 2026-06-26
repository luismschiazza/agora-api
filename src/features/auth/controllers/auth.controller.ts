import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Throttle, seconds } from '@nestjs/throttler';
import { LoginRequestDto } from '../dtos/validation/login-request.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Throttle({ default: { ttl: seconds(60), limit: 5 } })
  @Post('login')
  async login(@Body() _loginDto: LoginRequestDto, @Request() req) {
    return this.authService.login(req.user);
  }
}
