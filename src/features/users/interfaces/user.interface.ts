import { Document } from 'mongoose';

export interface User extends Document {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly emailVerifiedAt?: Date;
  readonly rememberToken?: string;
  readonly roles: string[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
