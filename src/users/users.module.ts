import { Module } from '@nestjs/common';
import { ExcludeOwnUserGuard } from './guards/exclude-own-user.guard';
import { NotOwnUserGuard } from './guards/not-own-user.guard';
import { UserModelModule } from './models/user-model.module';
import { ValidateObjectIdPipe } from './pipes/validate-object-id.pipe';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UniqueEmailValidator } from './validators/unique-email.validator';

@Module({
  imports: [UserModelModule],
  providers: [
    UsersService,
    UniqueEmailValidator,
    NotOwnUserGuard,
    ExcludeOwnUserGuard,
    ValidateObjectIdPipe,
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
