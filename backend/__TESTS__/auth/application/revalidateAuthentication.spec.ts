import { RevalidateAuthentication } from '@/auth/application';
import { Authentication } from '@/auth/domain';
import {
    AccessTokenCipherService,
    AuthResolver,
    AuthService,
    RefreshTokenCipherService,
} from '@/auth/infrastructure';
import { authStubRepository } from '@/auth/infrastructure/repository';
import { SharedModule } from '@/shared/infrastructure';
import { UserNotFoundError } from '@/users/domain';
import { userStub1 } from '@/users/infrastructure/repository';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

describe('auth/revalidateAuthentication', () => {
    let accessTokenCipher: AccessTokenCipherService;
    let refreshTokenCipher: RefreshTokenCipherService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [ConfigModule, SharedModule, JwtModule],
            providers: [
                AuthResolver,
                AuthService,
                AccessTokenCipherService,
                RefreshTokenCipherService,
            ],
        }).compile();

        accessTokenCipher = module.get<AccessTokenCipherService>(
            AccessTokenCipherService,
        );

        refreshTokenCipher = module.get<RefreshTokenCipherService>(
            RefreshTokenCipherService,
        );
    });

    test('should revalidate the authentication', async () => {
        // GIVEN
        const userId = userStub1.id;
        const ip = '1.1.1.1';

        // WHEN
        const res = await RevalidateAuthentication(
            authStubRepository(),
            accessTokenCipher,
            refreshTokenCipher,
        ).execute({ userId, ip });

        // THEN
        expect(res).toBeInstanceOf(Authentication);
        expect(res).toEqual({
            accessToken: expect.any(String),
            refreshToken: expect.any(String),
        });
    });

    test('should throw an error when the user is not found', async () => {
        // GIVEN
        const userId = 'not-found';
        const ip = '1.1.1.1';

        // WHEN
        const res = RevalidateAuthentication(
            authStubRepository(),
            accessTokenCipher,
            refreshTokenCipher,
        ).execute({ userId, ip });

        // THEN
        await expect(res).rejects.toBeInstanceOf(UserNotFoundError);
    });
});
