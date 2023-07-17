import { z } from 'zod';

export const userCreate = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
});
