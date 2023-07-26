import { codesError } from '@/shared/infrastructure/utils';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
    constructor() {
        super(
            {
                message: 'Unauthorized',
                cod: codesError.UNAUTHENTICATED,
                statusCode: HttpStatus.UNAUTHORIZED,
            },
            HttpStatus.UNAUTHORIZED,
        );
    }
}
