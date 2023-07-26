import { AuthRepository } from '@/auth/domain';
import { userAuthDbToModel } from '@/auth/infrastructure/adapters';
import { Db } from '@/shared/infrastructure/services';

export function authPrismaRepository(db: Db): AuthRepository {
    return {
        async findUserByEmail(email) {
            const user = await db.user.findUnique({ where: { email } });

            if (!user) return null;

            return userAuthDbToModel(user);
        },

        async update(userAuth) {
            const user = await db.user.update({
                where: { id: userAuth.id, updatedAt: userAuth.updatedAt },
                data: { tokenList: userAuth.tokenList },
            });

            return userAuthDbToModel(user);
        },
    };
}
