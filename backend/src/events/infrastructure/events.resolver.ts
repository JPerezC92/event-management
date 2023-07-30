import { UseFilters, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { UserFromReq } from '@/auth/infrastructure/decorators';
import { JwtAccessGuard } from '@/auth/infrastructure/guards';
import { eventCreate } from '@/events/infrastructure/schemas';
import { EventsService } from '@/events/infrastructure/services';
import {
    DbExceptionFilter,
    DomainExceptionFilter,
    ZodExceptionFilter,
} from '@/shared/infrastructure/filters';
import { Input } from '@/shared/infrastructure/graphql';
import { User } from '@/users/domain';
import * as graphql from 'src/graphql';

@Resolver()
@UseFilters(ZodExceptionFilter, DomainExceptionFilter, DbExceptionFilter)
export class EventsResolver {
    constructor(private readonly eventsService: EventsService) {}

    @Mutation()
    @UseGuards(JwtAccessGuard)
    async createEvent(
        @Args() { input }: Input,
        @UserFromReq() user: User,
    ): Promise<graphql.Event> {
        const data = eventCreate.parse(input);

        return await this.eventsService.createEvent(data, user.id);
    }
}
