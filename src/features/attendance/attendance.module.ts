import { Module } from '@nestjs/common';
import { AttendancesController } from './controllers/attendance.controller';
import { AttendanceModelModule } from './models/attendance-model.module';
import { AttendancesSeeder } from './seeders/attendance.seeder';
import { AttendancesService } from './services/attendance.service';

@Module({
  imports: [AttendanceModelModule],
  controllers: [AttendancesController],
  providers: [AttendancesService, AttendancesSeeder],
  exports: [AttendancesService],
})
export class AttendanceModule {}
