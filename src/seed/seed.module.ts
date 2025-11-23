import { Module } from '@nestjs/common';
import { UsersSeedModule } from '@/users/seeders/users.seed.module';
import { SeedService } from './seed.service';

@Module({
  imports: [UsersSeedModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
