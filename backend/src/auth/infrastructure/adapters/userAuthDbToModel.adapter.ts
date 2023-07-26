import { UserAuth } from '@/auth/domain';
import { User as UserDb } from '@prisma/client';
import { z } from 'zod';

export function userAuthDbToModel(userDb: UserDb) {
    return new UserAuth({
        ...userDb,
        tokenList: z.record(z.string(), z.string()).parse(userDb.tokenList),
    });
}
