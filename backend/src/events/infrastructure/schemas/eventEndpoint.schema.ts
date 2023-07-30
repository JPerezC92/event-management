import { z } from 'zod';
import { eventCreate } from './eventCreate.schema';

export const eventEndpoint = eventCreate.merge(
    z.object({
        id: z.string(),
        updatedAt: z.date(),
        createdAt: z.date(),
        userId: z.string(),
    }),
);
