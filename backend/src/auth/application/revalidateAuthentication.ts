import {
    AccessPayload,
    AuthRepository,
    Authentication,
    RefreshPayload,
    TokenCipher,
} from '@/auth/domain';
import { UseCase } from '@/shared/application';
import { UserNotFoundError } from '@/users/domain';

interface RevalidateAuthenticationInput {
    userId: string;
    ip: string;
}

export function RevalidateAuthentication(
    authRepository: AuthRepository,
    accessTokenCipher: TokenCipher<AccessPayload>,
    refreshTokenCipher: TokenCipher<RefreshPayload>,
): UseCase<Authentication, RevalidateAuthenticationInput> {
    /**
     * @throws { UserNotFoundError }
     */
    return {
        execute: async ({ userId, ip }) => {
            const user = await authRepository.findById(userId);

            if (!user) {
                throw new UserNotFoundError(userId);
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
