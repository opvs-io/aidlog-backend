import { IsInt, IsLatLong, IsString, Length, Min } from 'class-validator';

import { Trim } from '@aidlog/shared/transformers/string.transformer';

export class CreateRecordDto {
  @Trim()
  @IsLatLong()
  destination: string;

  @Trim()
  @IsString()
  @Length(6)
  productCode: string;

  @IsInt()
  @Min(1)
  amount: number;

  creatorId: string;
}
