import { z } from 'zod';

export const eventCreate = z.object({
    name: z.string(),
    date: z
        .string()
        .datetime()
        .transform((value) => new Date(value)),
    time: z
        .string()
        .datetime()
        .transform((value) => new Date(value)),
    location: z.string(),
    description: z.string(),
});

export type EventCreate = z.infer<typeof eventCreate>;
