import { DomainError } from '@/shared/domain';

export class InvalidCredentialsError implements DomainError {
    public code = 'INVALID_CREDENTIALS';
    public name: string = InvalidCredentialsError.name;
    public message = 'The credentials are invalid.';
}
