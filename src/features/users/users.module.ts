import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { ExcludeOwnUserGuard } from './guards/exclude-own-user.guard';
import { NotOwnUserGuard } from './guards/not-own-user.guard';
import { UserModelModule } from './models/user-model.module';
import { UsersService } from './services/users.service';
import { UniqueEmailValidator } from './validators/unique-email.validator';

@Module({
  imports: [UserModelModule],
  providers: [UsersService, UniqueEmailValidator, NotOwnUserGuard, ExcludeOwnUserGuard],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
