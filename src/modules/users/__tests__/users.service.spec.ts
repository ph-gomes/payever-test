import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserAvatarRepository } from '../repositories/user-avatar.repository';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../schemas/user.schema';
import { UsersService } from '../users.service';
import { fileFactory } from '../__mocks__/factories/file.factory';
import { userAvatarFactory } from '../__mocks__/factories/user-avatar.factory';
import { userFactory } from '../__mocks__/factories/user.factory';

jest.mock('../repositories/user.repository');
jest.mock('../repositories/user-avatar.repository');

jest.mock('../../../utils/delete-file');
jest.mock('../../../utils/upload-file');
jest.mock('../../../utils/file-to-base-64');

describe('UserService', () => {
  let service: UsersService;
  let userRepository: UserRepository;
  let userAvatarRepository: UserAvatarRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        UserRepository,
        UserAvatarRepository,
        {
          provide: 'SUBSCRIBERS_SERVICE',
          useFactory: () => ({ emit: jest.fn() }),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<UserRepository>(UserRepository);
    userAvatarRepository =
      module.get<UserAvatarRepository>(UserAvatarRepository);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(userAvatarRepository).toBeDefined();
  });

  describe('create', () => {
    describe('when create is called', () => {
      const body: CreateUserDto = {
        name: 'any_name',
        email: 'any_email@mail.com',
      };

      let user: User;

      beforeEach(async () => {
        user = await service.create(body);
      });

      test('then it should call the user repository', () => {
        expect(userRepository.create).toBeCalledTimes(1);
      });

      test('then it should call the user repository with the correct params', () => {
        expect(userRepository.create).toBeCalledWith(body);
      });

      test('then it should return the user', () => {
        expect(user).toEqual(userFactory());
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      const id = 'any_id';
      let user: User;

      beforeEach(async () => {
        user = await service.findOne(id);
      });

      test('then it should call the user repository', () => {
        expect(userRepository.findOne).toBeCalledTimes(1);
      });

      test('then it should call the user repository with the correct params', () => {
        expect(userRepository.findOne).toBeCalledWith({ _id: id });
      });

      test('then it should return the user', () => {
        expect(user).toEqual(userFactory());
      });
    });

    describe('when findOne is called and no user is found', () => {
      const id = 'any_id';
      let response: Promise<User>;

      beforeEach(() => {
        jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);
        response = service.findOne(id);
      });

      test('then it should call the user repository', async () => {
        try {
          await response;
          expect(true).toBe(false);
        } catch (e) {
          expect(userRepository.findOne).toBeCalledTimes(1);
        }
      });

      test('then it should call the user repository with the correct params', async () => {
        try {
          await response;
          expect(true).toBe(false);
        } catch (e) {
          expect(userRepository.findOne).toBeCalledWith({ _id: id });
        }
      });

      test('then it should throw a not found user error', async () => {
        try {
          await response;
          expect(true).toBe(false);
        } catch (e) {
          expect(e).toEqual(new NotFoundException('USER_NOT_FOUND'));
        }
      });
    });
  });

  describe('delete', () => {
    describe('when delete is called', () => {
      const id = 'any_id';

      beforeEach(async () => {
        jest.spyOn(service, 'findOne').mockResolvedValueOnce(userFactory());
        await service.deleteUserAvatar(id);
      });

      test('then it should call the service', () => {
        expect(service.findOne).toBeCalledTimes(1);
      });

      test('then it should call the service with the correct params', () => {
        expect(service.findOne).toBeCalledWith(id);
      });

      test('then it should call the user avatar find one repository method', () => {
        expect(userAvatarRepository.findOne).toBeCalledTimes(1);
      });

      test('then it should call the user avatar find one repository method with the correct params', () => {
        expect(userAvatarRepository.findOne).toBeCalledWith({
          userId: userFactory()._id,
        });
      });

      test('then it should call the user avatar delete repository method', () => {
        expect(userAvatarRepository.delete).toBeCalledTimes(1);
      });

      test('then it should call the user avatar delete repository method with the correct params', () => {
        expect(userAvatarRepository.delete).toBeCalledWith({
          userId: userAvatarFactory()._id,
        });
      });
    });

    describe('when delete is called and avatar not found', () => {
      const id = 'any_id';

      beforeEach(async () => {
        jest.spyOn(service, 'findOne').mockResolvedValueOnce(userFactory());
        jest.spyOn(userAvatarRepository, 'findOne').mockResolvedValueOnce(null);
        await service.deleteUserAvatar(id);
      });

      test('then it should call the service', () => {
        expect(service.findOne).toBeCalledTimes(1);
      });

      test('then it should call the service with the correct params', () => {
        expect(service.findOne).toBeCalledWith(id);
      });

      test('then it should call the user avatar find one repository method', () => {
        expect(userAvatarRepository.findOne).toBeCalledTimes(1);
      });

      test('then it should call the find one repository method with the correct params', () => {
        expect(userAvatarRepository.findOne).toBeCalledWith({
          userId: userFactory()._id,
        });
      });

      test('then it should not call the user avatar delete repository method', () => {
        expect(userAvatarRepository.delete).not.toBeCalled();
      });
    });
  });

  describe('getOrCreateUserAvatar', () => {
    describe('when getOrCreateUserAvatar is called with an existing avatar', () => {
      const id = 'any_id';
      let file: string;

      beforeEach(async () => {
        jest.spyOn(service, 'findOne').mockResolvedValueOnce(userFactory());
        file = await service.getOrCreateUserAvatar(id);
      });

      test('then it should call the service', () => {
        expect(service.findOne).toBeCalledTimes(1);
      });

      test('then it should call the service with the correct params', () => {
        expect(service.findOne).toBeCalledWith(id);
      });

      test('then it should return the found file in base64', () => {
        expect(file).toEqual('any_base64');
      });

      test('then it should not call the user avatar create repository method', () => {
        expect(userAvatarRepository.create).not.toBeCalled();
      });
    });

    describe('when getOrCreateUserAvatar is called with no existing avatar and the file is passed', () => {
      const id = 'any_id';
      const dummyFile = fileFactory();
      let file: string;

      beforeEach(async () => {
        jest.spyOn(service, 'findOne').mockResolvedValueOnce(userFactory());
        jest.spyOn(userAvatarRepository, 'findOne').mockResolvedValueOnce(null);
        file = await service.getOrCreateUserAvatar(id, dummyFile);
      });

      test('then it should call the service', () => {
        expect(service.findOne).toBeCalledTimes(1);
      });

      test('then it should call the service with the correct params', () => {
        expect(service.findOne).toBeCalledWith(id);
      });

      test('then it should call the user avatar create repository method', () => {
        expect(userAvatarRepository.create).toBeCalledTimes(1);
      });

      test('then it should call the user avatar create repository method with the correct params', () => {
        expect(userAvatarRepository.create).toBeCalledWith({
          hash: 'any_hash',
          userId: userFactory()._id,
        });
      });

      test('then it should return the found file in base64', () => {
        expect(file).toEqual('any_base64');
      });
    });

    describe('when getOrCreateUserAvatar is called with no existing avatar and no file is passed', () => {
      const id = 'any_id';
      let response: Promise<string>;
      let file: string;

      beforeEach(async () => {
        jest.spyOn(service, 'findOne').mockResolvedValueOnce(userFactory());
        jest.spyOn(userAvatarRepository, 'findOne').mockResolvedValueOnce(null);
        response = service.getOrCreateUserAvatar(id);
      });

      test('then it should call the service', async () => {
        try {
          await response;
          expect(true).toBe(false);
        } catch (e) {
          expect(service.findOne).toBeCalledTimes(1);
        }
      });

      test('then it should call the service with the correct params', async () => {
        try {
          await response;
          expect(true).toBe(false);
        } catch (e) {
          expect(service.findOne).toBeCalledWith(id);
        }
      });

      test('then it should not call the user avatar create repository method', async () => {
        try {
          await response;
          expect(true).toBe(false);
        } catch (e) {
          expect(userAvatarRepository.create).not.toBeCalled();
        }
      });

      test('then it should throw an not found error', async () => {
        try {
          await response;
          expect(true).toBe(false);
        } catch (e) {
          expect(e).toBeInstanceOf(NotFoundException);
          expect(e.message).toEqual('USER_AVATAR_NOT_FOUND');
        }
      });
    });
  });
});
