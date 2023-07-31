import { Find } from '@/events/application';
import { Event } from '@/events/domain';
import {
    eventsStubRepository,
    eventStub1,
} from '@/events/infrastructure/repository';

describe('events/find use case', () => {
    test('should find an event', async () => {
        // GIVEN
        const eventId = eventStub1.id;

        // WHEN
        const res = await Find(eventsStubRepository()).execute({
            eventId,
        });

        // THEN
        expect(res).toBeInstanceOf(Event);
        expect(res).toMatchObject({ id: eventId });
    });
});
