import { ValidationPipe } from './validation.pipe';
import { ArgumentMetadata, BadRequestException } from '@nestjs/common';

describe('ValidationPipe', () => {
  let pipe: ValidationPipe;

  beforeEach(() => {
    pipe = new ValidationPipe();
  });

  it('should throw BadRequestException for invalid input', async () => {
    const metadata: ArgumentMetadata = { type: 'body', metatype: String, data: '' };

    await expect(pipe.transform(123, metadata)).rejects.toThrow(BadRequestException);
  });

  it('should pass through valid input', async () => {
    const metadata: ArgumentMetadata = { type: 'body', metatype: String, data: '' };

    await expect(pipe.transform('valid input', metadata)).resolves.toBe('valid input');
  });
});