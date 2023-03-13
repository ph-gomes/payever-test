import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document } from 'mongoose';
import { valueToString } from '../../../utils/value-to-string';

@Schema({ timestamps: true })
export class User {
  @Transform(valueToString)
  _id: string;

  @Prop()
  name: string;

  @Prop()
  email: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
