import { User, UsersRepository } from '@/users/domain';

const userInMemoryDatabase: User[] = [
    User.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'John@gmail.comm',
    }),
];

export function userStubRepository(): UsersRepository {
    return {
        async findById(id) {
            const user = userInMemoryDatabase.find((user) => user.id === id);

            return user || null;
        },
        async create(user) {
            userInMemoryDatabase.push(user);

            return user;
        },

        findAll() {
            return Promise.resolve(userInMemoryDatabase);
        },
    };
}
