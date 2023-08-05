import { Attendee, AttendeesRepository } from '@/attendees/domain';
import { eventStub2 } from '@/events/infrastructure/repository';
import { userStub1 } from '@/users/infrastructure/repository';

export const attendeeStub1: Attendee = new Attendee({
    event: eventStub2,
    user: userStub1,
    createdAt: new Date(),
    updatedAt: new Date(),
});

export function attendeesStubRepository(): AttendeesRepository {
    const attendeesInMemoryDatabase: Attendee[] = [attendeeStub1];

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
