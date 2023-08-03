import { UseFilters, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserFromReq } from '@/auth/infrastructure/decorators';
import { JwtAccessGuard } from '@/auth/infrastructure/guards';
import * as eventSchemas from '@/events/infrastructure/schemas';
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
    async eventCreate(
        @Args() { input }: Input,
        @UserFromReq() user: User,
    ): Promise<graphql.Event> {
        const data = eventSchemas.eventCreate.parse(input);

        return await this.eventsService.create(data, user.id);
    }

    @Query()
    @UseGuards(JwtAccessGuard)
    async eventFind(@Args() { input }: Input): Promise<graphql.Event> {
        const eventFind = eventSchemas.eventFind.parse(input);

        return await this.eventsService.find(eventFind.id);
    }

    @Mutation()
    @UseGuards(JwtAccessGuard)
    async eventUpdate(
        @Args() { input }: Input,
        @UserFromReq() user: User,
    ): Promise<graphql.Event> {
        const eventUpdate = eventSchemas.eventUpdate.parse(input);

        return await this.eventsService.update(eventUpdate, user.id);
    }

    @Mutation()
    @UseGuards(JwtAccessGuard)
    async eventDelete(
        @Args() { input }: Input,
        @UserFromReq() user: User,
    ): Promise<graphql.Event> {
        const eventDelete = eventSchemas.eventDelete.parse(input);

        return await this.eventsService.delete(eventDelete.id, user.id);
    }

    @Query()
    async eventSearch(
        @Args() { input }: Input,
    ): Promise<graphql.EventSearchResult> {
        const eventSearch = eventSchemas.eventSearch.parse(input);

        return await this.eventsService.search(eventSearch);
    }
}
