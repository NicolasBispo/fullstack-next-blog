import { z } from 'zod';

const envSchema = z.object({
  auth: z.object({
    session_secret: z.string().min(1, 'Session secret is required'),
  }),
});

type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse({
  auth: {
    session_secret: process.env.SESSION_SECRET,
  },
}) as Env;
