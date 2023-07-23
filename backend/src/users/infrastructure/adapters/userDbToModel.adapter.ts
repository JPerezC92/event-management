import { User } from '@/users/domain';
import { User as UserDb } from '@prisma/client';

export function userDbToModel(user: UserDb) {
    return new User(user);
}
