import { Authenticate } from '@/auth/application';
import { Authentication, InvalidCredentialsError } from '@/auth/domain';
import {
    AccessTokenCipherService,
    AuthResolver,
    AuthService,
    RefreshTokenCipherService,
} from '@/auth/infrastructure';
import { authStubRepository } from '@/auth/infrastructure/repository';
import { SharedModule } from '@/shared/infrastructure';
import { BcryptPasswordCipherService } from '@/shared/infrastructure/services';
import {
    userInMemoryDatabase,
    userStub1,
} from '@/users/infrastructure/repository';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

describe('auth/authenticate use case', () => {
    let accessTokenCipher: AccessTokenCipherService;
    let refreshTokenCipher: RefreshTokenCipherService;
    let bcryptPasswordCipher: BcryptPasswordCipherService;
    const ip = '195.167.1.32';

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

        bcryptPasswordCipher = module.get<BcryptPasswordCipherService>(
            BcryptPasswordCipherService,
        );
    });

    test('should authenticate a user', async () => {
        // GIVEN
        const credentials = {
            email: userStub1.email,
            password: '123456',
        };

        // WHEN
        const res = await Authenticate(
            authStubRepository(),
            bcryptPasswordCipher,
            accessTokenCipher,
            refreshTokenCipher,
        ).execute({ credentials, ip });

        // THEN
        expect(res).toBeInstanceOf(Authentication);
        expect(
            userInMemoryDatabase.find((user) => user.id === userStub1.id)
                ?.tokenList[ip],
        ).toEqual(expect.any(String));
        expect(res.accessToken).toEqual(expect.any(String));
        expect(res.refreshToken).toEqual(expect.any(String));
    });

    test('should throw an error when the user does not exist', async () => {
        // GIVEN
        const credentials = {
            email: 'emailNotExists@gmail.com',
            password: '123456',
        };

        // WHEN
        const res = Authenticate(
            authStubRepository(),
            bcryptPasswordCipher,
            accessTokenCipher,
            refreshTokenCipher,
        ).execute({ credentials, ip });

        // THEN
        expect(res).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    test('should throw an error when the password is incorrect', async () => {
        // GIVEN
        const credentials = {
            email: userStub1.email,
            password: 'incorrectPassword',
        };

        // WHEN
        const res = Authenticate(
            authStubRepository(),
            bcryptPasswordCipher,
            accessTokenCipher,
            refreshTokenCipher,
        ).execute({ credentials, ip });

        // THEN
        expect(res).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});
