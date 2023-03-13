import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserAvatarRepository } from '../repositories/user-avatar.repository';
import { UserAvatar } from '../schemas/user-avatar.schema';
import { UserAvatarModel } from './support/user-avatar.model';

describe('UserAvatarRepository', () => {
  let repository: UserAvatarRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserAvatarRepository,
        {
          provide: getModelToken(UserAvatar.name),
          useClass: UserAvatarModel,
        },
      ],
    }).compile();

    repository = module.get<UserAvatarRepository>(UserAvatarRepository);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
