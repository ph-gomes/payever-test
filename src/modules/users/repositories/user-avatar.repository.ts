import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../../common/database/entity.repository';
import { UserAvatar, UserAvatarDocument } from '../schemas/user-avatar.schema';

@Injectable()
export class UserAvatarRepository extends EntityRepository<UserAvatarDocument> {
  constructor(@InjectModel(UserAvatar.name) model: Model<UserAvatarDocument>) {
    super(model);
  }
}
