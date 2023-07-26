import { User } from '@/users/domain';
import { User as UserDb } from '@prisma/client';
import { z } from 'zod';

export function userDbToModel(user: UserDb) {
    return new User({
        ...user,
        tokenList: z.record(z.string(), z.string()).parse(user.tokenList),
    });
}
