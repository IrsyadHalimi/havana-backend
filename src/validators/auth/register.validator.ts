import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(3),

  email: z.email(),

  role: z.enum(["customer", "tenant"]),
});