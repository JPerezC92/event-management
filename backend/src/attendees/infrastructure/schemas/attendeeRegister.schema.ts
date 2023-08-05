import { z } from 'zod';

export const attendeeRegister = z.object({
    eventId: z.string().uuid(),
});

export type AttendeeRegister = z.infer<typeof attendeeRegister>;
