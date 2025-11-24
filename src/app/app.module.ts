import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GenerateJwtSecretCommand } from '@/commands/generate-jwt-secret.command';
import { SeedCommand } from '@/commands/seed.command';
import { SeedModule } from '@/commands/seed/seed.module';
import { AuthModule } from '@/features/auth/auth.module';
import { DisciplinesModule } from '@/features/disciplines/disciplines.module';
import { UsersModule } from '@/features/users/users.module';
import { DatabaseModule } from '@/insfrastructure/database/database.module';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    DisciplinesModule,
    SeedModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedCommand, GenerateJwtSecretCommand],
})
export class AppModule {}
