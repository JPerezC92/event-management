import { EventsRepository } from '@/events/domain';
import { eventDbToModelAdapter } from '@/events/infrastructure/adapters/eventDbToModel.adapter';
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
    };
}