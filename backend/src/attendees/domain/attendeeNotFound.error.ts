import { DomainError } from '@/shared/domain';

export class AttendeeNotFoundError extends DomainError {
    public code = 'ATTENDEE_NOT_FOUND';
    public name = AttendeeNotFoundError.name;
    public message = 'The attendee was not found.';
}
