import { IsUUID } from 'class-validator';

export class FindAllByCreatorParamsDto {
  @IsUUID()
  uid: string;
}
