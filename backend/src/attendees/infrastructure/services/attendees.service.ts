import { Injectable } from '@nestjs/common';

import * as attendeeUseCase from '@/attendees/application/attend';
import { AttendeesPrismaRepository } from '@/attendees/infrastructure/repository';
import { EventsPrismaRepository } from '@/events/infrastructure/repository';
import { DatabaseService } from '@/shared/infrastructure/services';
import { UsersPrismaRepository } from '@/users/infrastructure/repository';
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
                        AttendeesPrismaRepository(trx),
                        EventsPrismaRepository(trx),
                        UsersPrismaRepository(trx),
                    )
                    .execute(attendeeRegister),
        );
    }
}
