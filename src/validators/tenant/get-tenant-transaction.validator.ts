import { z } from "zod";
import { ReservationStatus } from "@prisma/client";

export const getTenantTransactionsSchema = z.object({

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

  propertyId:

    z.string()

      .uuid()

      .optional(),

  orderNumber:

    z.string()

      .optional()

});