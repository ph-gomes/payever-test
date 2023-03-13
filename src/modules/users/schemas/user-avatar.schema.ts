import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document } from 'mongoose';
import { valueToString } from '../../../utils/value-to-string';

@Schema({ timestamps: true })
export class UserAvatar {
  @Transform(valueToString)
  _id: string;

  @Prop()
  userId: string;

  @Prop()
  hash: string;
}

export type UserAvatarDocument = UserAvatar & Document;

export const UserAvatarSchema = SchemaFactory.createForClass(UserAvatar);
