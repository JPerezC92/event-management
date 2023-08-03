import { Search } from '@/events/application';
import { Event } from '@/events/domain';
import {
    eventStub2,
    eventStub3,
    eventsStubRepository,
} from '@/events/infrastructure/repository';
import { EventSearch } from '@/events/infrastructure/schemas';
import { Pagination } from '@/shared/domain';
import { userStub1 } from '@/users/infrastructure/repository';

describe('events/search use case', () => {
    test('should return a list of events', async () => {
        // GIVEN
        const searchCriteria: EventSearch = {
            userId: userStub1.id,
        };

        // WHEN
        const result = await Search(eventsStubRepository()).execute(
            searchCriteria,
        );

        // THEN
        expect(
            result.eventList.every((event) => event instanceof Event),
        ).toBeTruthy();
        expect(result.eventList.length).toBeGreaterThan(0);
        expect(result.info).toBeInstanceOf(Pagination);
        expect(result.info.previousPage).toBeNull();
        expect(result.info.nextPage).toBeNull();
        expect(result.info.pages).toBe(1);
        expect(result.info.currentPage).toBe(1);
    });

    test('should return a list of events filtered by name', async () => {
        // GIVEN
        const searchCriteria: EventSearch = {
            name: 'event-name 2',
        };

        // WHEN
        const result = await Search(eventsStubRepository()).execute(
            searchCriteria,
        );

        // THEN
        expect(result.eventList.length).toBe(1);
        expect(result.eventList?.[0]?.name).toBe(eventStub2.name);
    });

    test('should return a list of events filtered by description', async () => {
        // GIVEN
        const searchCriteria: EventSearch = {
            description: 'my unique event description',
        };

        // WHEN
        const result = await Search(eventsStubRepository()).execute(
            searchCriteria,
        );

        // THEN
        expect(result.eventList.length).toBe(1);
        expect(result.eventList?.[0]?.description).toBe(eventStub3.description);
    });
});
