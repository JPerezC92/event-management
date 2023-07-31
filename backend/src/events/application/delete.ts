import {
    Event,
    EventNotCreatedByUserError,
    EventNotFoundError,
    EventsRepository,
} from '@/events/domain';
import { UseCase } from '@/shared/application';
import { User, UserNotFoundError, UsersRepository } from '@/users/domain';

interface DeleteInput {
    eventId: Event['id'];
    userId: User['id'];
}

/**
 * @throws { UserNotFoundError }
 * @throws { EventNotFoundError }
 * @throws { EventNotCreatedByUserError }
 */
export function Delete(
    eventsRepository: EventsRepository,
    usersRepository: UsersRepository,
): UseCase<Event, DeleteInput> {
    return {
        execute: async ({ eventId, userId }) => {
            const [event, user] = await Promise.all([
                eventsRepository.findById(eventId),
                usersRepository.findById(userId),
            ]);

            if (!event) throw new EventNotFoundError(eventId);
            if (!user) throw new UserNotFoundError(userId);
            if (!event.isCreatedBy(user))
                throw new EventNotCreatedByUserError();

            return await eventsRepository.delete(event);
        },
    };
}
