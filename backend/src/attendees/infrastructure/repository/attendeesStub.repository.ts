import { Attendee, AttendeesRepository } from '@/attendees/domain';

export function AttendeesStubRepository(): AttendeesRepository {
    const attendeesInMemoryDatabase: Attendee[] = [];
    return {
        async register(attendee) {
            attendeesInMemoryDatabase.push(attendee);
            return attendee;
        },

        async find(eventId, userId) {
            const attendee = attendeesInMemoryDatabase.find(
                (attendee) =>
                    attendee.event.id === eventId &&
                    attendee.user.id === userId,
            );

            if (!attendee) return null;

            return attendee;
        },
    };
}
