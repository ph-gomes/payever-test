import { UsersService as UsersServiceBase } from '../users.service';
import { userFactory } from './factories/user.factory';

const mockedValue: Record<keyof UsersServiceBase, jest.Mock> = {
  create: jest.fn().mockReturnValue(userFactory()),
  findOne: jest.fn().mockReturnValue(userFactory()),
  deleteUserAvatar: jest.fn(),
  getOrCreateUserAvatar: jest.fn().mockReturnValue('any_base64'),
};

export const UsersService = jest.fn().mockReturnValue(mockedValue);
