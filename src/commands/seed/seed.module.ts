import { Module } from '@nestjs/common';
import { UsersSeedModule } from '@/features/users/seeders/users.seed.module';
import { SeedService } from './services/seed.service';

@Module({
  imports: [UsersSeedModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
