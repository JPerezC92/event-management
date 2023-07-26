import { DomainError } from '@/shared/domain';

export class InvalidTokenError implements DomainError {
    public code = 'INVALID_TOKEN';
    public name: string = InvalidTokenError.name;
    public message = 'The token is invalid.';
}
