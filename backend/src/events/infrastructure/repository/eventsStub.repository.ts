import { Event, EventsRepository } from '@/events/domain';
import { Pagination } from '@/shared/domain';
import { userStub1 } from '@/users/infrastructure/repository';

export const eventStub1 = new Event({
    id: '602d6acd-50f2-4236-acf5-283786d01937',
    name: 'event-name',
    description: 'event-description',
    date: new Date(),
    location: 'event-location',
    time: new Date(),
    userId: userStub1.id,
    createdAt: new Date(),
    updatedAt: new Date(),
});

export function eventsStubRepository(): EventsRepository {
    let eventsInMemoryDatabase: Event[] = [eventStub1];

    return {
        async save(event) {
            eventsInMemoryDatabase.push(event);

            return event;
        },

        async findById(id) {
            const event = eventsInMemoryDatabase.find(
                (event) => event.id === id,
            );

            if (!event) return null;

            return event;
        },

        async update(event) {
            const eventIndex = eventsInMemoryDatabase.findIndex(
                (event) => event.id === event.id,
            );

            eventsInMemoryDatabase[eventIndex] = event;

            return event;
        },

        async delete(event) {
            eventsInMemoryDatabase = eventsInMemoryDatabase.filter(
                (_event) => _event.id !== event.id,
            );

            return event;
        },

        async search(eventSearch) {
            const eventList = eventsInMemoryDatabase.slice(
                eventSearch.page * eventSearch.limit,
                eventSearch.page * eventSearch.limit + eventSearch.limit,
            );

            return {
                eventList,
                info: Pagination.create({
                    pages: Math.ceil(
                        eventsInMemoryDatabase.length / eventSearch.limit,
                    ),
                    currentPage: eventSearch.page,
                }),
            };
        },
    };
}
