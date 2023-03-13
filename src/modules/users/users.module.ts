import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAvatarRepository } from './repositories/user-avatar.repository';
import { UserRepository } from './repositories/user.repository';
import { UserAvatar, UserAvatarSchema } from './schemas/user-avatar.schema';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserAvatar.name, schema: UserAvatarSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    UserAvatarRepository,
    {
      provide: 'SUBSCRIBERS_SERVICE',
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5672'],
            queue: 'payever_queue',
            queueOptions: { durable: false },
          },
        }),
    },
  ],
})
export class UsersModule {}
