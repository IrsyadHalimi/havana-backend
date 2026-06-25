import { z } from "zod";

export const createRoomSchema = z.object({
  name: z.string()
    .trim()
    .min(3)
    .max(100),

  description: z.string()
    .trim()
    .optional(),

  basePrice: z.number()
    .positive(),

  capacity: z.number()
    .int()
    .min(1),

  totalRoom: z.number()
    .int()
    .min(1)
});