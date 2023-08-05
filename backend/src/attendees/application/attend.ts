import { Attendee, AttendeesRepository } from '@/attendees/domain';
import { EventNotFoundError, EventsRepository } from '@/events/domain';
import { UseCase } from '@/shared/application';
import {
    UserAlreadyParticipatingError,
    UserNotFoundError,
    UsersRepository,
} from '@/users/domain';

export interface RegisterInput {
    eventId: string;
    userId: string;
}

/**
 * @throws { EventNotFoundError }
 * @throws { UserNotFoundError }
 * @throws { UserAlreadyParticipatingError }
 */
export function Attend(
    attendeesRepository: AttendeesRepository,
    eventsRepository: EventsRepository,
    usersRepository: UsersRepository,
): UseCase<Attendee, RegisterInput> {
    return {
        async execute(input: RegisterInput) {
            const [event, user, attendeeFound] = await Promise.all([
                eventsRepository.findById(input.eventId),
                usersRepository.findById(input.userId),
                attendeesRepository.find(input.eventId, input.userId),
            ]);

            if (attendeeFound) throw new UserAlreadyParticipatingError();
            if (!event) throw new EventNotFoundError(input.eventId);
            if (!user) throw new UserNotFoundError(input.userId);

            const attendee = Attendee.create({ event, user });

            return await attendeesRepository.register(attendee);
        },
    };
}
