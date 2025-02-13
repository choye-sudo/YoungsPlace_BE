import { ArgumentMetadata, BadRequestException, PipeTransform, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
      return value;
    }

    const object = plainToInstance(metadata.metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException(
        errors.map(err => Object.values(err.constraints)).flat().join(', ')
      );
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype as any);
  }
}
