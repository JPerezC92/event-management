import { z } from 'zod';

export const attendeesCount = z.object({
    eventId: z.string(),
});
