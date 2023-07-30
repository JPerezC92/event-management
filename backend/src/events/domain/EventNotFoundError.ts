import { DomainError } from '@/shared/domain';

export class EventNotFoundError extends DomainError {
    public code = 'EVENT_NOT_FOUND';
    public name: string = EventNotFoundError.name;
    public message: string;

    constructor(id: string) {
        super();
        this.message = `Event with id ${id} not found`;
    }
}
