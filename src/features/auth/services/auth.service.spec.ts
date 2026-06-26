import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { Role } from '@/common/enums/role.enum';
import { UsersService } from '@/features/users/services/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = {
    findOneByEmailWithPassword: jest.fn(),
    findOneById: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
    decode: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('validates credentials and returns a user without password', async () => {
    const password = 'dev123456';
    const passwordHash = await bcrypt.hash(password, 4);

    mockUsersService.findOneByEmailWithPassword.mockResolvedValue({
      id: 'user-id',
      email: 'developer@example.com',
      name: 'Developer',
      password: passwordHash,
      roles: [Role.ADMIN],
    });

    const user = await service.validateUser(' Developer@Example.com ', password);

    expect(mockUsersService.findOneByEmailWithPassword).toHaveBeenCalledWith(
      'developer@example.com',
    );
    expect(user).toEqual({
      id: 'user-id',
      email: 'developer@example.com',
      name: 'Developer',
      roles: [Role.ADMIN],
    });
    expect(user).not.toHaveProperty('password');
  });

  it('signs access tokens with a stable subject id', async () => {
    mockJwtService.sign.mockReturnValue('signed-token');
    mockJwtService.decode.mockReturnValue({ exp: Math.floor(Date.now() / 1000) + 3600 });

    await service.login({
      id: 'user-id',
      email: 'developer@example.com',
      name: 'Developer',
      roles: [Role.ADMIN],
    });

    expect(mockJwtService.sign).toHaveBeenCalledWith({
      sub: 'user-id',
      email: 'developer@example.com',
      roles: [Role.ADMIN],
    });
  });
});
