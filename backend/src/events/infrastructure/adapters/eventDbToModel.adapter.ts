import { Event as EventDb } from '@prisma/client';

import { Event } from '@/events/domain';

export function eventDbToModelAdapter(event: EventDb) {
    return new Event({
        id: event.id,
        name: event.name,
        date: event.date,
        time: event.time,
        location: event.location,
        description: event.description,
        updatedAt: event.updatedAt,
        createdAt: event.createdAt,
        userId: event.userId,
    });
}
