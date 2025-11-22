import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { DisciplinesService } from '../disciplines.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueNameValidator implements ValidatorConstraintInterface {
  constructor(private readonly disciplinesService: DisciplinesService) {}

  async validate(name: string): Promise<boolean> {
    const disciplines = await this.disciplinesService.findByName(name);
    return !disciplines;
  }

  defaultMessage(args: ValidationArguments) {
    return `The course "${args.value}" already exists. Choose another name.`;
  }
}

export function IsUniqueName(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [],
      validator: UniqueNameValidator,
      options: validationOptions,
    });
  };
}
