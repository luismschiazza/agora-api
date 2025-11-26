import { Module } from '@nestjs/common';
import { MeetingsController } from './controllers/meeting.controller';
import { MeetingModelModule } from './models/meeting-model.module';
import { MeetingsSeeder } from './seeders/meetings.seeder';
import { MeetingsService } from './services/meeting.service';

@Module({
  imports: [MeetingModelModule],
  controllers: [MeetingsController],
  providers: [MeetingsService, MeetingsSeeder],
  exports: [MeetingsService],
})
export class MeetingsModule {}
