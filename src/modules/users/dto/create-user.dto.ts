import { IsString, Length } from 'class-validator';

import { Trim } from '@aidlog/shared/transformers/string.transformer';

export class CreateUserDto {
  @Trim()
  @IsString()
  @Length(1, 32)
  firstName: string;

  @Trim()
  @IsString()
  @Length(1, 32)
  lastName: string;

  uid: string;
}
