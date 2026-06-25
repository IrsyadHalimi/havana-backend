import { z } from "zod";

export const updateProfileSchema =
  z.object({

    fullName:
      z.string().min(3),

    phone:
      z.string()
        .max(20)
        .optional()

  });