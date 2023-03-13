import { MockModel } from '../../../../common/database/__test__/support/model.mock';
import { User } from '../../schemas/user.schema';
import { userFactory } from '../../__mocks__/factories/user.factory';

export class UserModel extends MockModel<User> {
  protected entity = userFactory();
}
