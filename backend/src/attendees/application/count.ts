import { AttendeesRepository } from '@/attendees/domain';
import { Event, EventNotFoundError, EventsRepository } from '@/events/domain';
import { UseCase } from '@/shared/application';

export interface CountInput {
    eventId: Event['id'];
}

/**
 * @throws { EventNotFoundError }
 */
export function Count(
    eventsRepository: EventsRepository,
    attendeesRepository: AttendeesRepository,
): UseCase<number, CountInput> {
    return {
        async execute({ eventId }) {
            const event = await eventsRepository.findById(eventId);

            if (!event) throw new EventNotFoundError(eventId);

            const count = await attendeesRepository.participantsCount(eventId);

            return count;
        },
    };
}
