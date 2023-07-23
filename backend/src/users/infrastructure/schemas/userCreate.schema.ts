import { z } from 'zod';

export const userBase = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
});

export const userCreate = userBase
    .merge(
        z.object({
            password: z.string().min(8),
            confirmPassword: z.string().min(8),
        }),
    )
    .superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Passwords do not match',
                path: ['confirmPassword'],
            });
        }

        return data;
    });

export type UserCreate = z.infer<typeof userCreate>;
