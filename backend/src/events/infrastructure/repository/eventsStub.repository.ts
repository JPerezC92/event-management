import { Event, EventsRepository } from '@/events/domain';

export const eventStub1 = new Event({
    id: '602d6acd-50f2-4236-acf5-283786d01937',
    name: 'event-name',
    description: 'event-description',
    date: new Date(),
    location: 'event-location',
    time: new Date(),
    userId: 'user-id',
    createdAt: new Date(),
    updatedAt: new Date(),
});

const eventsInMemoryDatabase: Event[] = [eventStub1];

export function EventsStubRepository(): EventsRepository {
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
    };
}
