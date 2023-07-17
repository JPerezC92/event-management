import { BadRequestException, HttpStatus } from '@nestjs/common';
import { ZodSchema } from 'zod';

export function schemaValidator<T>(schema: ZodSchema<T>, data: unknown): T {
    const res = schema.safeParse(data);

    if (res.success === true) {
        return res.data;
    }

    throw new BadRequestException({
        message: res.error.message,
        code: 'BAD_USER_INPUT',
        statusCode: HttpStatus.BAD_REQUEST,
    });
}
