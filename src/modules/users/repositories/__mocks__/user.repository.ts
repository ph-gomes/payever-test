import { userFactory } from '../../__mocks__/factories/user.factory';
import { UserRepository as UserRepositoryBase } from '../user.repository';

const mockedValue: Record<keyof UserRepositoryBase, jest.Mock> = {
  create: jest.fn().mockReturnValue(userFactory()),
  findOne: jest.fn().mockReturnValue(userFactory()),
  delete: jest.fn(),
};

export const UserRepository = jest.fn().mockReturnValue(mockedValue);
