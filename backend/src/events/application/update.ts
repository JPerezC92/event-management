import {
    Event,
    EventNotCreatedByUserError,
    EventNotFoundError,
    EventsRepository,
} from '@/events/domain';
import { UseCase } from '@/shared/application';
import { User, UserNotFoundError, UsersRepository } from '@/users/domain';

interface UpdateInput {
    eventUpdate: Parameters<Event['update']>[0];
    userId: User['id'];
}

/**
 * @throws { EventNotFoundError }
 * @throws { UserNotFoundError }
 * @throws { EventNotCreatedByUserError }
 */
export function Update(
    eventsRepository: EventsRepository,
    usersRepository: UsersRepository,
): UseCase<Event, UpdateInput> {
    return {
        async execute({ eventUpdate, userId }) {
            const [event, user] = await Promise.all([
                eventsRepository.findById(eventUpdate.id),
                usersRepository.findById(userId),
            ]);

            if (!user) throw new UserNotFoundError(userId);
            if (!event) throw new EventNotFoundError(eventUpdate.id);
            if (!event.isCreatedBy(user))
                throw new EventNotCreatedByUserError();

            const updatedEvent = event.update(eventUpdate);

            await eventsRepository.update(updatedEvent);

            return updatedEvent;
        },
    };
}
