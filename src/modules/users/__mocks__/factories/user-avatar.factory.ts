import { UserAvatar } from '../../schemas/user-avatar.schema';

export const userAvatarFactory = (): UserAvatar => ({
  _id: 'any_id',
  userId: 'any_user_id',
  hash: 'any_hash',
});
