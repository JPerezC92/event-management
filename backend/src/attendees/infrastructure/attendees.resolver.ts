import { UseFilters, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import * as attendeeSchema from '@/attendees/infrastructure/schemas';
import { AttendeesService } from '@/attendees/infrastructure/services';
import { UserFromReq } from '@/auth/infrastructure/decorators';
import { JwtAccessGuard } from '@/auth/infrastructure/guards';
import {
    DbExceptionFilter,
    DomainExceptionFilter,
    ZodExceptionFilter,
} from '@/shared/infrastructure/filters';
import { Input } from '@/shared/infrastructure/graphql';
import { User } from '@/users/domain';

@Resolver()
@UseFilters(ZodExceptionFilter, DomainExceptionFilter, DbExceptionFilter)
export class AttendeesResolver {
    constructor(private readonly attendeesService: AttendeesService) {}

    @Mutation()
    @UseGuards(JwtAccessGuard)
    attendeeAttend(@Args() { input }: Input, @UserFromReq() user: User) {
        const attendeeRegister = attendeeSchema.attendeeRegister.parse(input);
        return this.attendeesService.attend({
            ...attendeeRegister,
            userId: user.id,
        });
    }

    @Query()
    attendeeCount(@Args() { input }: Input) {
        const attendeeParticipantCount =
            attendeeSchema.attendeesCount.parse(input);

        return this.attendeesService.count(attendeeParticipantCount);
    }
}
