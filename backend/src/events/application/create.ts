import { Event, EventsRepository } from '@/events/domain';
import { UseCase } from '@/shared/application';
import { User, UserNotFoundError, UsersRepository } from '@/users/domain';

interface CreateInput {
    eventNew: Omit<Parameters<typeof Event.create>[0], 'userId'>;
    userId: User['id'];
}

export function Create(
    eventsRepository: EventsRepository,
    usersRepository: UsersRepository,
): UseCase<Event, CreateInput> {
    return {
        /**
         * @throws { UserNotFoundError }
         */
        execute: async ({ eventNew, userId }) => {
            const event = Event.create({ ...eventNew, userId });

            const user = await usersRepository.findById(event.userId);

            if (!user) {
                throw new UserNotFoundError(event.userId);
            }

            await eventsRepository.save(event);

            return event;
        },
    };
}
