import { IsUUID } from 'class-validator';

export class FindAllByRequesterParamsDto {
  @IsUUID()
  uid: string;
}
