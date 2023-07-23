import { UseFilters } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
    DbExceptionFilter,
    DomainExceptionFilter,
    ZodExceptionFilter,
} from '@/shared/infrastructure/filters';
import { Input } from '@/shared/infrastructure/graphql';
import { DatabaseService } from '@/shared/infrastructure/services';
import * as userSchemas from '@/users/infrastructure/schemas';
import { UsersService } from '@/users/infrastructure/services';
import * as graphql from 'src/graphql';

@Resolver('Users')
@UseFilters(DbExceptionFilter, DomainExceptionFilter, ZodExceptionFilter)
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService,
        readonly prisma: DatabaseService,
    ) {}

    @Mutation()
    async createUser(@Args() { input }: Input): Promise<graphql.User> {
        const data = userSchemas.userCreate.parse(input);

        return await this.usersService.create(data);
    }

    // @Query()
    // async findUser(@Args('id') id: string): Promise<graphql.User> {
    //     const usersRepository = userStubRepository();

    //     const user = await usersRepository.findById(id);

    //     return user;
    // }

    @Query()
    async findAllUsers(): Promise<graphql.User[]> {
        // const usersRepository = userStubRepository();

        // const users = await usersRepository.findAll();

        return [];
    }
}
