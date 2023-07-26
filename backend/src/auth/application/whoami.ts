import { UserAuth } from '@/auth/domain';
import { Adapter, UseCase } from '@/shared/application';
import { User, UserNotFoundError, UsersRepository } from '@/users/domain';

interface WhoamiInput {
    userId: UserAuth['id'];
}

export function Whoami<T>(
    usersRepository: UsersRepository,
    outAdapter: Adapter<User, T>,
): UseCase<T, WhoamiInput> {
    return {
        execute: async ({ userId }) => {
            const user = await usersRepository.findById(userId);

            if (!user) throw new UserNotFoundError(userId);

            return outAdapter(user);
        },
    };
}
