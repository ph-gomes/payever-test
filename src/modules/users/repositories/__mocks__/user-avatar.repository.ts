import { userAvatarFactory } from '../../__mocks__/factories/user-avatar.factory';
import { UserAvatarRepository as UserAvatarRepositoryBase } from '../user-avatar.repository';

const mockedValue: Record<keyof UserAvatarRepositoryBase, jest.Mock> = {
  create: jest.fn().mockReturnValue(userAvatarFactory()),
  findOne: jest.fn().mockReturnValue(userAvatarFactory()),
  delete: jest.fn(),
};

export const UserAvatarRepository = jest.fn().mockReturnValue(mockedValue);
