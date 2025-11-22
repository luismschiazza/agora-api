import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Discipline extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  code: string;

  @Prop()
  description: string;

  @Prop({ default: Date.now })
  created: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const DisciplineSchema = SchemaFactory.createForClass(Discipline);
