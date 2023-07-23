import { User, UsersRepository } from '@/users/domain';

export const userStub1 = new User({
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@gmail.comm',
    password: '123456',
    updatedAt: new Date(),
    createdAt: new Date(),
});

const userInMemoryDatabase: User[] = [userStub1];

export function userStubRepository(): UsersRepository {
    return {
        async findById(id) {
            const user = userInMemoryDatabase.find((user) => user.id === id);

            return user || null;
        },
        async save(user) {
            userInMemoryDatabase.push(user);

            return user;
        },
        async findByEmail(email) {
            const user = userInMemoryDatabase.find(
                (user) => user.email === email,
            );

            return user || null;
        },

        async findAll() {
            return await Promise.resolve(userInMemoryDatabase);
        },
    };
}
