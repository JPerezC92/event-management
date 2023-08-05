import { AttendeesRepository } from '@/attendees/domain';
import { attendeeDbToModelAdapter } from '@/attendees/infrastructure/adapters';
import { Db } from '@/shared/infrastructure/services';

export function attendeesPrismaRepository(db: Db): AttendeesRepository {
    return {
        async register(attendee) {
            const attendeeCreated = await db.eventAttendee.create({
                data: {
                    event: {
                        connect: {
                            id: attendee.event.id,
                        },
                    },
                    user: {
                        connect: {
                            id: attendee.user.id,
                        },
                    },
                },
                include: {
                    event: true,
                    user: true,
                },
            });

            return attendeeDbToModelAdapter(
                attendeeCreated,
                attendeeCreated.event,
                attendeeCreated.user,
            );
        },

        async find(eventId, userId) {
            const attendee = await db.eventAttendee.findFirst({
                where: {
                    eventId,
                    userId,
                },
                include: {
                    event: true,
                    user: true,
                },
            });

            if (!attendee) return null;

            return attendeeDbToModelAdapter(
                attendee,
                attendee.event,
                attendee.user,
            );
        },

        async participantsCount(eventId) {
            const count = await db.eventAttendee.count({ where: { eventId } });

            return count;
        },
    };
}
