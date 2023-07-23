import { codesError } from '@/shared/infrastructure/utils';
import {
    BadRequestException,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError)
export class ZodExceptionFilter implements ExceptionFilter {
    catch(exception: ZodError) {
        throw new BadRequestException({
            message: JSON.stringify(exception.errors).replace(/"/g, ''),
            code: codesError.BAD_USER_INPUT,
            statusCode: HttpStatus.BAD_REQUEST,
        });
    }
}
