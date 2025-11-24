import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '@/features/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmailWithPassword(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    return user;
  }

  async validateUserById(userId: string): Promise<any> {
    return await this.usersService.findOneById(userId);
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };

    const accessToken = this.jwtService.sign(payload);
    const decoded = this.jwtService.decode(accessToken) as { exp?: number };

    const expiresIn = decoded?.exp ? decoded.exp - Math.floor(Date.now() / 1000) : null;

    return {
      token_type: 'Bearer',
      expires_in: expiresIn,
      access_token: accessToken,
    };
  }
}
