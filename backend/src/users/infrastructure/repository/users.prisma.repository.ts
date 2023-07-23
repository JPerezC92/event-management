import { Db } from '@/shared/infrastructure/services';
import { UsersRepository } from '@/users/domain';
import { userDbToModel } from '@/users/infrastructure/adapters';

export function UsersPrismaRepository(db: Db): UsersRepository {
    return {
        async save(user) {
            const _user = await db.user.create({
                data: { ...user },
            });
            return userDbToModel(_user);
        },

        async findById(id) {
            const user = await db.user.findUnique({
                where: { id },
            });

            if (!user) return null;

            return userDbToModel(user);
        },

        async findByEmail(email) {
            const user = await db.user.findUnique({
                where: { email },
            });

            if (!user) return null;

            return userDbToModel(user);
        },

        async findAll() {
            const userList = await db.user.findMany();
            return userList.map(userDbToModel);
        },
    };
}
