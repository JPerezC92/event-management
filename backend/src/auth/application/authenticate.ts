import {
    AccessPayload,
    AuthRepository,
    Authentication,
    InvalidCredentialsError,
    RefreshPayload,
    TokenCipher,
} from '@/auth/domain';
import { UseCase } from '@/shared/application';
import { PasswordCipher } from '@/shared/domain';

interface AuthenticateInput {
    credentials: {
        email: string;
        password: string;
    };
    ip: string;
}

export function Authenticate(
    authRepository: AuthRepository,
    passwordCipher: PasswordCipher,
    accessTokenCipher: TokenCipher<AccessPayload>,
    refreshTokenCipher: TokenCipher<RefreshPayload>,
): UseCase<Authentication, AuthenticateInput> {
    /**
     * @throws { InvalidCredentialsError }
     */
    return {
        execute: async ({ credentials, ip }) => {
            const user = await authRepository.findUserByEmail(
                credentials.email,
            );

            if (!user) throw new InvalidCredentialsError();

            if (
                !(await passwordCipher.compare(
                    credentials.password,
                    user.password,
                ))
            ) {
                throw new InvalidCredentialsError();
            }

            const authentication = await user.authenticate(
                accessTokenCipher,
                refreshTokenCipher,
                ip,
            );

            await authRepository.update(user);

            return authentication;
        },
    };
}
