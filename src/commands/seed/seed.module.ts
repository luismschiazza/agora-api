import { Module } from '@nestjs/common';
import { AttendancesSeedModule } from '@/features/attendance/seeders/attendance-seed.module';
import { DisciplinesSeedModule } from '@/features/disciplines/seeders/disciplines.seed.module';
import { GradesSeederModule } from '@/features/grades/seeders/grades.module';
import { MeetingsSeedModule } from '@/features/meeting/seeders/meetings.seed.module';
import { UsersSeedModule } from '@/features/users/seeders/users.seed.module';
import { SeedService } from './services/seed.service';

@Module({
  imports: [
    DisciplinesSeedModule,
    UsersSeedModule,
    AttendancesSeedModule,
    MeetingsSeedModule,
    GradesSeederModule,
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
