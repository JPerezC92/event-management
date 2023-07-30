import { EventsRepository } from '@/events/domain';
import { Event as EventDb } from '@prisma/client';

const eventsInMemoryDatabase: EventDb[] = [];

export function EventsStubRepository(): EventsRepository {
    return {
        async save(event) {
            eventsInMemoryDatabase.push(event);

            return event;
        },
    };
}
