import { faker } from '@faker-js/faker';
import { User } from '../schemas/user.schema';

export class UserFactory {
  static make(): Partial<User> {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static makeMany(amount: number): Partial<User>[] {
    return Array.from({ length: amount }, () => this.make());
  }
}
