import * as validator from 'class-validator';

import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsPositiveInt(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isPositiveInt',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return validator.isInt(value) && value >= 1;
        },

        defaultMessage(args: ValidationArguments) {
          return `${propertyName} must be an integer that larger than 1`;
        },
      },
    });
  };
}
