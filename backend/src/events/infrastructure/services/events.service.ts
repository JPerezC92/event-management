import { Injectable } from '@nestjs/common';

import * as eventUseCase from '@/events/application';
import { Event } from '@/events/domain';
import { EventsPrismaRepository } from '@/events/infrastructure/repository';
import { EventCreate } from '@/events/infrastructure/schemas';
import { DatabaseService } from '@/shared/infrastructure/services';
import { User } from '@/users/domain';
import { UsersPrismaRepository } from '@/users/infrastructure/repository';

@Injectable()
export class EventsService {
    constructor(private readonly dbService: DatabaseService) {}
    async create(eventCreate: EventCreate, userId: User['id']) {
        return await this.dbService.$transaction(
            async (trx) =>
                await eventUseCase
                    .Create(
                        EventsPrismaRepository(trx),
                        UsersPrismaRepository(trx),
                    )
                    .execute({ eventNew: eventCreate, userId }),
        );
    }

    async find(eventId: Event['id']) {
        return await this.dbService.$transaction(
            async (trx) =>
                await eventUseCase
                    .Find(EventsPrismaRepository(trx))
                    .execute({ eventId }),
        );
    }
}
