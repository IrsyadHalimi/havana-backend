import { z } from "zod";

export const createAvailabilitySchema =
  z.object({

    date:
      z.string(),

    availableRooms:
      z.number()
        .int()
        .min(0)

  });