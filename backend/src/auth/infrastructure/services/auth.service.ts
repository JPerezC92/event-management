import { Injectable } from '@nestjs/common';

import * as authUseCase from '@/auth/application';
import { authPrismaRepository } from '@/auth/infrastructure/repository';
import {
    BcryptPasswordCipherService,
    DatabaseService,
} from '@/shared/infrastructure/services';
import { User } from '@/users/domain';
import { usersPrismaRepository } from '@/users/infrastructure/repository';
import { userEndpoint } from '@/users/infrastructure/schemas';
import * as graphql from 'src/graphql';
import { AccessTokenCipherService } from './accessTokenCipher.service';
import { RefreshTokenCipherService } from './refreshTokenCipher.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly dbService: DatabaseService,
        private readonly passwordCipher: BcryptPasswordCipherService,
        private readonly accessTokenCipher: AccessTokenCipherService,
        private readonly refreshTokenCipher: RefreshTokenCipherService,
    ) {}

    async login(
        credentials: graphql.Credencials,
        ip: string,
    ): Promise<graphql.AuthPayload> {
        return await this.dbService.$transaction(
            async (trx) =>
                await authUseCase
                    .Authenticate(
                        authPrismaRepository(trx),
                        this.passwordCipher,
                        this.accessTokenCipher,
                        this.refreshTokenCipher,
                    )
                    .execute({ credentials, ip }),
        );
    }

    async whoami(userId: User['id']): Promise<graphql.User> {
        return await this.dbService.$transaction(
            async (trx) =>
                await authUseCase
                    .Whoami(usersPrismaRepository(trx), userEndpoint.parse)
                    .execute({ userId }),
        );
    }

    async refreshToken(
        userId: string,
        ip: string,
    ): Promise<graphql.AuthPayload> {
        return await this.dbService.$transaction(
            async (trx) =>
                await authUseCase
                    .RevalidateAuthentication(
                        authPrismaRepository(trx),
                        this.accessTokenCipher,
                        this.refreshTokenCipher,
                    )
                    .execute({ userId, ip }),
        );
    }
}
