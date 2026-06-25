import { z } from "zod";

export const updateCategorySchema =
  z.object({
    name: z
      .string()
      .trim()
      .min(3)
      .max(100)
  });