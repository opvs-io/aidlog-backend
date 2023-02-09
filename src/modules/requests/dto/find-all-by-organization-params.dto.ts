import { ToNumber } from '@aidlog/shared/transformers/string.transformer';
import { IsPositiveInt } from '@aidlog/shared/validators/number.validator';

export class FindAllByOrganizationParamsDto {
  @ToNumber()
  @IsPositiveInt()
  organizationId: number;
}
