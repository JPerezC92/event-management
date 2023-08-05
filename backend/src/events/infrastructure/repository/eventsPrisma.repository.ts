import { EventsRepository } from '@/events/domain';
import { eventDbToModelAdapter } from '@/events/infrastructure/adapters';
import { Pagination } from '@/shared/domain';
import { Db } from '@/shared/infrastructure/services';
import { Prisma } from '@prisma/client';

export function eventsPrismaRepository(db: Db): EventsRepository {
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

        async delete(event) {
            const _event = await db.event.delete({
                where: { id: event.id },
            });

            return eventDbToModelAdapter(_event);
        },

        async search(eventSearch) {
            const where: Prisma.EventWhereInput = {};

            if (eventSearch.name) {
                where.name = {
                    contains: eventSearch.name,
                };
            }

            if (eventSearch.description) {
                where.description = {
                    contains: eventSearch.description,
                };
            }

            if (eventSearch.userId) {
                where.userId = {
                    equals: eventSearch.userId,
                };
            }

            const eventCount = await db.event.count({ where });

            const eventList = await db.event.findMany({
                where,
                orderBy: {
                    date: 'asc',
                },

                skip: (eventSearch.page - 1) * eventSearch.limit,
                take: eventSearch.limit,
            });

            return {
                eventList: eventList.map(eventDbToModelAdapter),
                info: Pagination.create({
                    pages: Math.ceil(eventCount / eventSearch.limit),
                    currentPage: eventSearch.page,
                }),
            };
        },
    };
}
