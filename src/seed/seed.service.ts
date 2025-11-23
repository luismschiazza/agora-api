import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';
import { User } from '../users/interfaces/user.interface';

@Injectable()
export class SeedService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async seed() {
    // Add wildcard user logic
    const wildcardUserEmail = 'developer@example.com';
    const wildcardUserPassword = 'dev123';

    const existingUser = await this.userModel.findOne({ email: wildcardUserEmail }).exec();
    if (!existingUser) {
      const wildcardUser = {
        name: 'Wildcard User',
        email: wildcardUserEmail,
        password: wildcardUserPassword, // Optionally hash this in a real-world scenario
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await this.userModel.create(wildcardUser);
      console.log(`Wildcard user created: ${wildcardUserEmail} / ${wildcardUserPassword}`);
    } else {
      console.log(`Wildcard user already exists: ${wildcardUserEmail}`);
    }

    // Existing seeding logic
    const users = [];
    for (let i = 0; i < 25; i++) {
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await this.userModel.insertMany(users);
    return 'Seed data created successfully';
  }
}
