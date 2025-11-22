import { Document } from 'mongoose';

export interface Discipline extends Document {
  readonly name: string;
  readonly code?: string;
  readonly description?: string;
  readonly createdAt: Date;
  readonly updateAt: Date;
}
