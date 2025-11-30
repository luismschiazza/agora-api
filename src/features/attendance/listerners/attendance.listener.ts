import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendance } from '../interfaces/attendance.interface';

@Injectable()
export class AttendanceListener {
  constructor(
    @InjectModel('Attendance')
    private readonly attendanceModel: Model<Attendance>,
  ) {}

  @OnEvent('attendance.created')
  async handleAttendanceCreated(attendance: Attendance) {
    const userId = attendance.student;
    const disciplineId = attendance.discipline;

    const totalClasses = await this.attendanceModel.countDocuments({
      student: userId,
      discipline: disciplineId,
    });

    if (totalClasses === 0) {
      return;
    }

    const totalPresent = await this.attendanceModel.countDocuments({
      student: userId,
      discipline: disciplineId,
      status: 'PRESENT',
    });

    const percent = (totalPresent / totalClasses) * 100;

    if (percent < 75) {
      console.log(
        `[LISTENER] Presença baixa detectada (${percent.toFixed(
          2,
        )}%) para o aluno ${userId} na disciplina ${disciplineId}.`,
      );
    }
  }
}
