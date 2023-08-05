import {
    EventAttendee,
    Event as EventDb,
    User as UserDb,
} from '@prisma/client';

import { Attendee } from '@/attendees/domain';
import { eventDbToModelAdapter } from '@/events/infrastructure/adapters';
import { userDbToModelAdapter } from '@/users/infrastructure/adapters';

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
