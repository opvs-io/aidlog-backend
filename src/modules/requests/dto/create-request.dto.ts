import {
  IsInt,
  IsLatLong,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

import { Trim } from '@aidlog/shared/transformers/string.transformer';

export class CreateRequestDto {
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

  @IsOptional()
  @Length(0, 300)
  description?: string;

  requesterUid: string;
}
