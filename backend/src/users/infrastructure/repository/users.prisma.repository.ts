import { Db } from '@/shared/infrastructure/services';
import { UsersRepository } from '@/users/domain';
import { userDbToModelAdapter } from '@/users/infrastructure/adapters';

export function usersPrismaRepository(db: Db): UsersRepository {
    return {
        async save(user) {
            const _user = await db.user.create({
                data: { ...user },
            });
            return userDbToModelAdapter(_user);
        },

        async findById(id) {
            const user = await db.user.findUnique({
                where: { id },
            });

            if (!user) return null;

            return userDbToModelAdapter(user);
        },

        async findByEmail(email) {
            const user = await db.user.findUnique({
                where: { email },
            });

            if (!user) return null;

            return userDbToModelAdapter(user);
        },

        async findAll() {
            const userList = await db.user.findMany();
            return userList.map(userDbToModelAdapter);
        },
    };
}
