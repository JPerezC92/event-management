import { Event, EventNotFoundError, EventsRepository } from '@/events/domain';
import { UseCase } from '@/shared/application';

interface FintInput {
    eventId: Event['id'];
}

export function Find(
    eventsRepository: EventsRepository,
): UseCase<Event, FintInput> {
    return {
        execute: async ({ eventId }) => {
            const event = await eventsRepository.findById(eventId);

            if (!event) throw new EventNotFoundError(eventId);

            return event;
        },
    };
}
