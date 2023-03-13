import { MockModel } from '../../../../common/database/__test__/support/model.mock';
import { UserAvatar } from '../../schemas/user-avatar.schema';
import { userAvatarFactory } from '../../__mocks__/factories/user-avatar.factory';

export class UserAvatarModel extends MockModel<UserAvatar> {
  protected entity = userAvatarFactory();
}
