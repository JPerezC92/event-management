import {
    Attendee,
    AttendeeNotFoundError,
    AttendeesRepository,
} from '@/attendees/domain';
import { Event } from '@/events/domain';
import { UseCase } from '@/shared/application';
import { User } from '@/users/domain';

export interface CancelAttendanceInput {
    eventId: Event['id'];
    userId: User['id'];
}

/**
 * @throws { AttendeeNotFoundError }
 */
export function Unattend(
    attendeesRepository: AttendeesRepository,
): UseCase<Attendee, CancelAttendanceInput> {
    return {
        async execute({ eventId, userId }) {
            const attendeeFound = await attendeesRepository.find(
                eventId,
                userId,
            );

            if (!attendeeFound) throw new AttendeeNotFoundError();

            return await attendeesRepository.unregister(attendeeFound);
        },
    };
}
