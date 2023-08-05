import { DomainError } from '@/shared/domain';

export class UserAlreadyParticipatingError extends DomainError {
    public readonly code = 'USER_ALREADY_PARTICIPATING';
    public readonly name = UserAlreadyParticipatingError.name;
    public readonly message: string;

    constructor() {
        super();
        this.message = `The user is already participating in this event.`;
    }
}
