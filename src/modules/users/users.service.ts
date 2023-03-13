import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { deleteFile } from '../../utils/delete-file';
import { fileToBase64 } from '../../utils/file-to-base-64';
import { uploadFile } from '../../utils/upload-file';
import { CreateUserDto } from './dto/create-user.dto';
import { UserAvatarRepository } from './repositories/user-avatar.repository';
import { UserRepository } from './repositories/user.repository';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly avatarRepository: UserAvatarRepository,
    @Inject('SUBSCRIBERS_SERVICE') private subscribersService: ClientProxy,
  ) {}

  create(user: CreateUserDto): Promise<User> {
    this.subscribersService.emit('user_created', user);
    return this.userRepository.create(user);
  }

  async findOne(id: string): Promise<User> {
    const found = await this.userRepository.findOne({ _id: id });
    if (!found) {
      throw new NotFoundException('USER_NOT_FOUND');
    }
    return found;
  }

  async getOrCreateUserAvatar(
    id: string,
    file?: Express.Multer.File,
  ): Promise<string> {
    const user = await this.findOne(id);
    const avatar = await this.avatarRepository.findOne({ userId: user._id });

    if (avatar) {
      return fileToBase64(avatar.hash);
    }

    if (file) {
      const hash = uploadFile(file);
      const avatar = await this.avatarRepository.create({
        hash,
        userId: user._id,
      });

      return fileToBase64(avatar.hash);
    }

    throw new NotFoundException('USER_AVATAR_NOT_FOUND');
  }

  async deleteUserAvatar(id: string): Promise<void> {
    const user = await this.findOne(id);
    const avatar = await this.avatarRepository.findOne({ userId: user._id });
    if (avatar) {
      deleteFile(avatar.hash);
      await this.avatarRepository.delete({ userId: user._id });
    }
  }
}
