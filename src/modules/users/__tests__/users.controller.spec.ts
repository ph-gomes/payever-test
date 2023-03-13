import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../schemas/user.schema';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { userFactory } from '../__mocks__/factories/user.factory';

jest.mock('../users.service');

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    describe('when create is called', () => {
      const body: CreateUserDto = {
        name: 'any_name',
        email: 'any_email@mail.com',
      };

      let user: User;

      beforeEach(async () => {
        user = await controller.create(body);
      });

      test('then it should call the service', () => {
        expect(service.create).toBeCalledTimes(1);
      });

      test('then it should call the service with the correct params', () => {
        expect(service.create).toBeCalledWith(body);
      });

      test('then it should return the user', () => {
        expect(user).toEqual(userFactory());
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await controller.findOne('any_id');
      });

      test('then it should call the service', () => {
        expect(service.findOne).toBeCalledTimes(1);
      });

      test('then it should call the service with the correct params', () => {
        expect(service.findOne).toBeCalledWith('any_id');
      });

      test('then it should return the user', () => {
        expect(user).toEqual(userFactory());
      });
    });
  });

  describe('getOrCreateUserAvatar', () => {
    describe('when getOrCreateUserAvatar is called', () => {
      let base64: string;

      beforeEach(async () => {
        base64 = await controller.getOrCreateUserAvatar('any_id', null);
      });

      test('then it should call the service', () => {
        expect(service.getOrCreateUserAvatar).toBeCalledTimes(1);
      });

      test('then it should call the service with the correct params', () => {
        expect(service.getOrCreateUserAvatar).toBeCalledWith('any_id', null);
      });

      test('then it should return the user', () => {
        expect(base64).toEqual('any_base64');
      });
    });
  });

  describe('create', () => {
    describe('when create is called', () => {
      beforeEach(async () => {
        await controller.deleteUserAvatar('any_id');
      });

      test('then it should call the service', () => {
        expect(service.deleteUserAvatar).toBeCalledTimes(1);
      });

      test('then it should call the service with the correct params', () => {
        expect(service.deleteUserAvatar).toBeCalledWith('any_id');
      });
    });
  });
});
