import { EventsRepository } from '@/events/domain';
import { eventDbToModelAdapter } from '@/events/infrastructure/adapters';
import { Db } from '@/shared/infrastructure/services';

export function EventsPrismaRepository(db: Db): EventsRepository {
    return {
        async save(event) {
            const _event = await db.event.create({
                data: {
                    id: event.id,
                    name: event.name,
                    description: event.description,
                    date: event.date,
                    location: event.location,
                    time: event.time,
                    userId: event.userId,
                },
            });

            return eventDbToModelAdapter(_event);
        },
        async findById(id) {
            const event = await db.event.findUnique({
                where: { id },
            });

            if (!event) return null;

            return eventDbToModelAdapter(event);
        },

        async update(event) {
            const _event = await db.event.update({
                where: { id: event.id },
                data: {
                    name: event.name,
                    description: event.description,
                    date: event.date,
                    location: event.location,
                    time: event.time,
                },
            });

            return eventDbToModelAdapter(_event);
        },
    };
}
