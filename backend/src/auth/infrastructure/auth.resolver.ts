import { UseFilters, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserFromReq } from '@/auth/infrastructure/decorators';
import { JwtAccessGuard } from '@/auth/infrastructure/guards';
import { credentials } from '@/auth/infrastructure/schemas';
import { GetIp } from '@/shared/infrastructure/decorators';
import {
    DbExceptionFilter,
    DomainExceptionFilter,
    ZodExceptionFilter,
} from '@/shared/infrastructure/filters';
import { Input } from '@/shared/infrastructure/graphql';
import { User } from '@/users/domain';
import * as graphql from 'src/graphql';
import { AuthService } from './services';

@Resolver()
@UseFilters(ZodExceptionFilter, DbExceptionFilter, DomainExceptionFilter)
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation()
    async login(
        @Args() { input }: Input,
        @GetIp() ip: string,
    ): Promise<graphql.AuthPayload> {
        const data = credentials.parse(input);

        return await this.authService.login(data, ip);
    }

    @Query()
    @UseGuards(JwtAccessGuard)
    async whoami(@UserFromReq() user: User): Promise<graphql.User> {
        return await this.authService.whoami(user.id);
    }
}
