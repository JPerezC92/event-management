import { Injectable } from '@nestjs/common';

import * as eventUseCase from '@/events/application';
import { Event } from '@/events/domain';
import { eventsPrismaRepository } from '@/events/infrastructure/repository';
import {
    EventCreate,
    EventSearch,
    EventUpdate,
} from '@/events/infrastructure/schemas';
import { DatabaseService } from '@/shared/infrastructure/services';
import { User } from '@/users/domain';
import { usersPrismaRepository } from '@/users/infrastructure/repository';
import { EventSearchResult } from 'src/graphql';

@Injectable()
export class EventsService {
    constructor(private readonly dbService: DatabaseService) {}

    async create(eventCreate: EventCreate, userId: User['id']) {
        return await this.dbService.$transaction(
            async (trx) =>
                await eventUseCase
                    .Create(
                        eventsPrismaRepository(trx),
                        usersPrismaRepository(trx),
                    )
                    .execute({ eventNew: eventCreate, userId }),
        );
    }

    async find(eventId: Event['id']) {
        return await this.dbService.$transaction(
            async (trx) =>
                await eventUseCase
                    .Find(eventsPrismaRepository(trx))
                    .execute({ eventId }),
        );
    }

    async update(eventUpdate: EventUpdate, id: string): Promise<Event> {
        return await this.dbService.$transaction(
            async (trx) =>
                await eventUseCase
                    .Update(
                        eventsPrismaRepository(trx),
                        usersPrismaRepository(trx),
                    )
                    .execute({ eventUpdate, userId: id }),
        );
    }

    async delete(eventId: Event['id'], userId: User['id']): Promise<Event> {
        return await this.dbService.$transaction(
            async (trx) =>
                await eventUseCase
                    .Delete(
                        eventsPrismaRepository(trx),
                        usersPrismaRepository(trx),
                    )
                    .execute({ eventId, userId }),
        );
    }

    async search(eventSearch: EventSearch): Promise<EventSearchResult> {
        return await this.dbService.$transaction(
            async (trx) =>
                await eventUseCase
                    .Search(eventsPrismaRepository(trx))
                    .execute({ ...eventSearch }),
        );
    }
}
