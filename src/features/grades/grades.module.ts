import { Module } from '@nestjs/common';
import { GradesController } from './controllers/grades.controller';
import { GradeModelModule } from './models/grade-model.module';
import { GradesSeeder } from './seeders/grades.seeder';
import { GradesService } from './services/grades.service';

@Module({
  imports: [GradeModelModule],
  controllers: [GradesController],
  providers: [GradesService, GradesSeeder],
  exports: [GradesService],
})
export class GradesModule {}
