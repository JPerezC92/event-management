import { z } from 'zod';

export const attendeeCancel = z.object({
    eventId: z.string().uuid(),
});

export type AttendeeCancel = z.infer<typeof attendeeCancel>;
