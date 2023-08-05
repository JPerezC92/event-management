import { Attendee } from '@/attendees/domain';
import { eventDbToModelAdapter } from '@/events/infrastructure/adapters';
import { userDbToModelAdapter } from '@/users/infrastructure/adapters';
import {
    EventAttendee,
    Event as EventDb,
    User as UserDb,
} from 'prisma/prisma-client';

export function attendeeDbToModelAdapter(
    attendee: EventAttendee,
    event: EventDb,
    user: UserDb,
): Attendee {
    return new Attendee({
        createdAt: attendee.createdAt,
        updatedAt: attendee.updatedAt,
        event: eventDbToModelAdapter(event),
        user: userDbToModelAdapter(user),
    });
}
