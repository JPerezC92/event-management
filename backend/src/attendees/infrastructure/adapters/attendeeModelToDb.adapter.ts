import { Attendee } from '@/attendees/domain';
import { EventAttendee } from 'prisma/prisma-client';

export function AttendeeModelToDb(attendee: Attendee): EventAttendee {
    return {
        eventId: attendee.event.id,
        userId: attendee.user.id,
        createdAt: attendee.createdAt,
        updatedAt: attendee.updatedAt,
    };
}
