import {
    BcryptPasswordCipherService,
    DatabaseService,
} from '@/shared/infrastructure/services';
import * as userUseCase from '@/users/application/register';
import { UsersPrismaRepository } from '@/users/infrastructure/repository';

import * as userSchemas from '@/users/infrastructure/schemas';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor(
        private readonly db: DatabaseService,
        private readonly passwordCipher: BcryptPasswordCipherService,
    ) {}

    async create(userCreate: userSchemas.UserCreate) {
        return await this.db.$transaction(
            async (trx) =>
                await userUseCase
                    .Register(
                        UsersPrismaRepository(trx),
                        this.passwordCipher,
                        userSchemas.userEndpoint.parse,
                    )
                    .execute({ userCreate }),
        );
    }
}
