import { z } from "zod";

export const changePasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(8),

  newPassword: z
    .string()
    .min(8)
    .max(100)
});