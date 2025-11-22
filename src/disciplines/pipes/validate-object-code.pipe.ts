import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateDisciplineCodePipe implements PipeTransform<string> {
  transform(value: string): string {
    const code = value.trim().toUpperCase();
    const regex = /^[A-Z]{2,4}[0-9]{1,4}[A-Z]?$/;

    if (!regex.test(code)) {
      throw new BadRequestException(
        `"${value}" is not a valid discipline code. Valid examples: MAT101, GEO2A, HIS303.`,
      );
    }

    return code;
  }
}
