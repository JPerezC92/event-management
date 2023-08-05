import { Injectable } from '@nestjs/common';

import * as attendeeUseCase from '@/attendees/application';
import { attendeesPrismaRepository } from '@/attendees/infrastructure/repository';
import { eventsPrismaRepository } from '@/events/infrastructure/repository';
import { DatabaseService } from '@/shared/infrastructure/services';
import { usersPrismaRepository } from '@/users/infrastructure/repository';
import * as graphql from 'src/graphql';

@Injectable()
export class AttendeesService {
    constructor(private readonly db: DatabaseService) {}

    async attend(
        attendeeRegister: attendeeUseCase.RegisterInput,
    ): Promise<graphql.Attendee> {
        return await this.db.$transaction(
            async (trx) =>
                await attendeeUseCase
                    .Attend(
                        attendeesPrismaRepository(trx),
                        eventsPrismaRepository(trx),
                        usersPrismaRepository(trx),
                    )
                    .execute(attendeeRegister),
        );
    }

    async count(eventId: attendeeUseCase.CountInput): Promise<number> {
        return await this.db.$transaction(
            async (trx) =>
                await attendeeUseCase
                    .Count(
                        eventsPrismaRepository(trx),
                        attendeesPrismaRepository(trx),
                    )
                    .execute(eventId),
        );
    }
}
