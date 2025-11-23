import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { UsersSeeder } from '@/features/users/seeders/users.seeder';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  constructor(private readonly usersSeeder: UsersSeeder) {}

  async seedUsers(limit?: number): Promise<void> {
    await this.usersSeeder.run(limit);
    this.logger.log('✔ Users seeding finished.');
  }
}
