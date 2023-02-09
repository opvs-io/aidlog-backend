import { IsPositiveInt } from '@aidlog/shared/validators/number.validator';

export class FindAllByOrganizationParamsDto {
  @IsPositiveInt()
  organizationId: number;
}
