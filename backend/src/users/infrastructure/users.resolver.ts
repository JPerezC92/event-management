import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import * as sharedSchemas from '@/shared/infrastructure/schemas';
import { userStubRepository } from '@/users/infrastructure/repository/users.stub.repository';
import * as userSchemas from '@/users/infrastructure/schemas';
import * as graphql from 'src/graphql';

@Resolver('Users')
export class UsersResolver {
    @Mutation()
    async createUser(@Args() args: unknown): Promise<graphql.User> {
        const data = sharedSchemas.schemaValidator(
            userSchemas.userCreate,
            args,
        );

        return {
            id: '1',
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
        };
    }

    @Query()
    async findUser(@Args('id') id: string): Promise<graphql.User> {
        const usersRepository = userStubRepository();

        const user = await usersRepository.findById(id);

        return user;
    }

    @Query()
    async findAllUsers(): Promise<graphql.User[]> {
        const usersRepository = userStubRepository();

        const users = await usersRepository.findAll();

        return users;
    }
}
