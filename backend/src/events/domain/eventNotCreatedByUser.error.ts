import { DomainError } from '@/shared/domain';

export class EventNotCreatedByUserError extends DomainError {
    public code = 'EVENT_NOT_CREATED_BY_USER';
    public name: string = EventNotCreatedByUserError.name;
    public message: string;

    constructor() {
        super();
        this.message = "You can't update an event that you didn't create";
    }
}
