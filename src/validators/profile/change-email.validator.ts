import { z } from "zod";

export const changeEmailSchema = z.object({
  email: z
    .string()
    .trim()
    .email()
});