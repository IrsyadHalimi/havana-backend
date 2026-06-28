import { z } from "zod";

export const verifyEmailSchema =
  z.object({
    token: z.string().min(10),

    password: z.string().min(8),
  });