import { z } from 'zod';
import { userBase } from './userCreate.schema';

export const userEndpoint = userBase.merge(
    z.object({
        id: z.string(),
        updatedAt: z.date(),
        createdAt: z.date(),
    }),
);
