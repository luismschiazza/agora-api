import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DisciplinesService } from './disciplines.service';
import { DisciplinesController } from './disciplines.controller';
import { DisciplineSchema } from './schemas/discipline.schema';

// VALIDATORS
import { UniqueNameValidator } from './validators/unique-name.validator';

// GUARDS
import { ManageDisciplines } from './guards/manage-disciplines.guard';

// PIPES
import { ValidateDisciplineCodePipe } from './pipes/validate-object-code.pipe';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Discipline', schema: DisciplineSchema },
    ]),
  ],
  providers: [
    DisciplinesService,
    UniqueNameValidator,
    ManageDisciplines,
    ValidateDisciplineCodePipe,
  ],
  controllers: [DisciplinesController],
  exports: [DisciplinesService],
})
export class DisciplinesModule {}
