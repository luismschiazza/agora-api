import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { DisciplinesSeeder } from '@/features/disciplines/seeders/disciplines.seeder';
import { UsersSeeder } from '@/features/users/seeders/users.seeder';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  constructor(
    private readonly usersSeeder: UsersSeeder,
    private readonly disciplinesSeeder: DisciplinesSeeder,
  ) {}

  async seedDisciplines(limit?: number): Promise<void> {
    await this.disciplinesSeeder.run(limit);
    this.logger.log('✔ Disciplines seeding finished.');
  }

  async seedUsers(limit?: number): Promise<void> {
    await this.usersSeeder.run(limit);
    this.logger.log('✔ Users seeding finished.');
  }
}
