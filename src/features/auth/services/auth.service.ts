import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Role } from '@/common/enums/role.enum';
import { UsersService } from '@/features/users/services/users.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  roles: Role[];
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<AuthenticatedUser | null> {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await this.usersService.findOneByEmailWithPassword(normalizedEmail);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles as Role[],
    };
  }

  async validateUserById(userId: string) {
    return await this.usersService.findOneById(userId);
  }

  async login(user: AuthenticatedUser) {
    const payload: JwtPayload = { email: user.email, sub: user.id, roles: user.roles };

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
