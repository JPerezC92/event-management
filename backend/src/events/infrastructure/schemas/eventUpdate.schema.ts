import { z } from 'zod';

import { eventEndpoint } from './eventEndpoint.schema';

export const eventUpdate = eventEndpoint
    .pick({
        id: true,
        name: true,
        date: true,
        time: true,
        location: true,
        description: true,
    })
    .partial({
        name: true,
        date: true,
        time: true,
        location: true,
        description: true,
    });

export type EventUpdate = z.infer<typeof eventUpdate>;
