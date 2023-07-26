import { DomainError } from '@/shared/domain';

export class UserNotFoundError extends DomainError {
    public readonly code = 'USER_NOT_FOUND';
    public readonly name = UserNotFoundError.name;
    public readonly message: string;

    constructor(userId: string) {
        super();
        this.message = `The user with id ${userId} was not found.`;
    }
}
