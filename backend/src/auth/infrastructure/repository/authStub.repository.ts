import { AuthRepository } from '@/auth/domain';
import { userAuthDbToModel } from '@/auth/infrastructure/adapters';
import { User } from '@/users/domain';
import { userInMemoryDatabase } from '@/users/infrastructure/repository';

export function authStubRepository(): AuthRepository {
    return {
        async findUserByEmail(email) {
            const user = userInMemoryDatabase.find(
                (user) => user.email === email,
            );

            if (!user) return null;

            return userAuthDbToModel(user);
        },

        async update(userAuth) {
            const index = userInMemoryDatabase.findIndex(
                (user) => user.id === userAuth.id,
            );

            const _user = userInMemoryDatabase[index];

            if (_user) {
                userInMemoryDatabase[index] = new User({
                    ..._user,
                    ...userAuth,
                });
            }

            return userAuth;
        },
    };
}
