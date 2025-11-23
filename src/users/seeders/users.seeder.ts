import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserFactory } from '../factories/user.factory';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UsersSeeder {
  private readonly logger = new Logger(UsersSeeder.name);

  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  async run(limit?: number): Promise<void> {
    // Wildcard user
    const wildcardUserEmail = 'developer@example.com';
    const wildcardUserPassword = 'dev123';

    const existingUser = await this.userModel.findOne({ email: wildcardUserEmail }).exec();

    if (!existingUser) {
      await this.userModel.create({
        name: 'Wildcard User',
        email: wildcardUserEmail,
        password: wildcardUserPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      this.logger.log(`Created wildcard user: ${wildcardUserEmail} / ${wildcardUserPassword}`);
    } else {
      this.logger.log(`Wildcard user already exists: ${wildcardUserEmail}`);
    }

    const amount = limit && limit > 0 ? limit : 25;
    const users = UserFactory.makeMany(amount);
    await this.userModel.insertMany(users);

    this.logger.log(`✔ Created ${amount} user(s).`);
  }
}
