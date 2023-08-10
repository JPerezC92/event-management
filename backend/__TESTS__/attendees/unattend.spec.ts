import { Unattend } from '@/attendees/application';
import { Attendee, AttendeeNotFoundError } from '@/attendees/domain';
import {
    attendeeStub1,
    attendeesInMemoryDatabase,
    attendeesStubRepository,
} from '@/attendees/infrastructure/repository';

describe('attendees/unattend use case', () => {
    test('should unattend an attendee', async () => {
        // GIVEN
        const userId = attendeeStub1.user.id;
        const eventId = attendeeStub1.event.id;

        // WHEN
        const res = await Unattend(attendeesStubRepository()).execute({
            userId,
            eventId,
        });

        // THEN
        expect(res).toBeInstanceOf(Attendee);
        expect(attendeesInMemoryDatabase.length).toBe(0);
    });

    test('should throw an error when attendee does not exist', () => {
        // GIVEN
        const userId = 'invalidUserId';
        const eventId = 'invalidEventId';

        // WHEN
        const res = Unattend(attendeesStubRepository()).execute({
            userId,
            eventId,
        });

        // THEN
        expect(res).rejects.toBeInstanceOf(AttendeeNotFoundError);
    });
});
