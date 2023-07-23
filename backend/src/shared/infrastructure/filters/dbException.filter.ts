import { codesError } from '@/shared/infrastructure/utils';
import {
    Catch,
    ExceptionFilter,
    HttpStatus,
    InternalServerErrorException,
} from '@nestjs/common';
import {
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError, PrismaClientUnknownRequestError)
export class DbExceptionFilter implements ExceptionFilter {
    catch(
        _exception:
            | PrismaClientKnownRequestError
            | PrismaClientUnknownRequestError,
    ) {
        throw new InternalServerErrorException({
            message: "Couldn't process your request, please try again.",
            code: codesError.BAD_USER_INPUT,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        });
    }
}
