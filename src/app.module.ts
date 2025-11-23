import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SeedCommand } from '@/commands/seed.command';
import { SeedModule } from '@/seed/seed.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    SeedModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedCommand],
})
export class AppModule {}
