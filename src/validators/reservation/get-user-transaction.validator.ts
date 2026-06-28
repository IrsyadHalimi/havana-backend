import { z } from "zod";

import {
  ReservationStatus
} from "@prisma/client";

export const getUserTransactionsSchema =
  z.object({

    page:
      z.coerce.number()
        .min(1)
        .default(1),

    limit:
      z.coerce.number()
        .min(1)
        .max(100)
        .default(10),

    status:
      z.nativeEnum(
        ReservationStatus
      ).optional(),

    orderNumber:
      z.string()
        .optional(),

    startDate:
      z.string()
        .optional(),

    endDate:
      z.string()
        .optional()

});