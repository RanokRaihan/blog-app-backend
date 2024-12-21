import { z } from "zod";

export const loginUserSchema = z.object({
  body: z
    .object({
      email: z.string().email(),
      password: z
        .string()
        .min(6, { message: "password must be at least 6 character!" })
        .max(20, { message: "password must be at most 20 character!" }),
    })
    .strict(),
});
