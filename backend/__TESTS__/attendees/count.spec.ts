import { Count } from '@/attendees/application';
import { attendeesStubRepository } from '@/attendees/infrastructure/repository';
import { EventNotFoundError } from '@/events/domain';
import {
    eventStub2,
    eventsStubRepository,
} from '@/events/infrastructure/repository';

describe('attendees/count use case', () => {
    test('should return the number of attendees', async () => {
        // GIVEN
        const eventId = eventStub2.id;

        // WHEN
        const res = await Count(
            eventsStubRepository(),
            attendeesStubRepository(),
        ).execute({ eventId });

        // THEN
        expect(res).toBe(1);
    });

    test('should throw an error if the event does not exist', async () => {
        // GIVEN
        const eventId = 'non-existing-event-id';

        // WHEN
        const res = Count(
            eventsStubRepository(),
            attendeesStubRepository(),
        ).execute({ eventId });

        // THEN
        await expect(res).rejects.toBeInstanceOf(EventNotFoundError);
    });
});
