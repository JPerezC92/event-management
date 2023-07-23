import { DomainError } from '@/shared/domain';

export class EmailAlreadyInUseError extends DomainError {
    public readonly code = 'EMAIL_ALREADY_IN_USE';
    public readonly name = EmailAlreadyInUseError.name;
    public readonly message: string;

    constructor(email: string) {
        super();
        this.message = `The email ${email} is already in use.`;
    }
}
