import { z } from "zod";

export const updatePropertySchema =
  z.object({

    categoryId:
      z.string().uuid(),

    name:
      z.string()
        .trim()
        .min(3)
        .max(200),

    description:
      z.string()
        .trim()
        .min(10),

    address:
      z.string()
        .trim()
        .min(5),

    city:
      z.string()
        .trim()
        .min(2),

    latitude:
      z.number().optional(),

    longitude:
      z.number().optional()
  });