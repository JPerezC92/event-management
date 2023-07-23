import { DomainError } from '@/shared/domain';
import {
    Catch,
    ExceptionFilter,
    HttpStatus,
    InternalServerErrorException,
} from '@nestjs/common';

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
    catch(exception: DomainError) {
        throw new InternalServerErrorException({
            message: exception.message,
            code: exception.code,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        });
    }
}
