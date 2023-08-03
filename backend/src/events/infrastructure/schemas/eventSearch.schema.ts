import { z } from 'zod';

import { eventEndpoint } from './eventEndpoint.schema';

export const eventSearch = eventEndpoint
    .pick({
        name: true,
        description: true,
    })
    .merge(
        z.object({
            page: z.number().int().positive().default(1),
            limit: z.number().int().positive().default(10),
            userId: z.string().uuid().optional(),
        }),
    )
    .partial();

export type EventSearch = z.infer<typeof eventSearch>;
