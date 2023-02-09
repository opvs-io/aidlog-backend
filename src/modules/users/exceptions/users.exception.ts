import { BaseException } from '@aidlog/shared/exceptions/base.exception';

export enum UserExceptionName {
  UserNotFoundException = 'UserNotFoundException',
}

export class UserNotFoundException extends BaseException {
  constructor() {
    const name = UserExceptionName.UserNotFoundException;
    const status = 404;
    super(name, status, 'User not found.');
  }
}
