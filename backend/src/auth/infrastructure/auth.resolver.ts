import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { credentials } from '@/auth/infrastructure/schemas';
import {
    DbExceptionFilter,
    DomainExceptionFilter,
    ZodExceptionFilter,
} from '@/shared/infrastructure/filters';
import { Input } from '@/shared/infrastructure/graphql';
import { UseFilters } from '@nestjs/common';
import * as graphql from 'src/graphql';

import { GetIp } from '@/shared/infrastructure/decorators/GetIp';
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
}
