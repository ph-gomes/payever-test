import { User } from '../../schemas/user.schema';

export const userFactory = (): User => ({
  _id: 'any_id',
  email: 'any_email@mail.com',
  name: 'any_name',
});
