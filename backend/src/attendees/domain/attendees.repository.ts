import { Event } from '@/events/domain';
import { User } from '@/users/domain';
import { Attendee } from './attendee.model';

export interface AttendeesRepository {
    register(attendee: Attendee): Promise<Attendee>;
    find(eventId: Event['id'], userId: User['id']): Promise<Attendee | null>;
}
