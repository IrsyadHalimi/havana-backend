import { z } from "zod";

export const createReservationSchema =
  z.object({

    propertyId:
      z.string().uuid(),

    roomId:
      z.string().uuid(),

    checkInDate:
      z.coerce.date(),

    checkOutDate:
      z.coerce.date(),

    totalGuests:
      z
        .number()
        .int()
        .positive()

  }).superRefine(

    (data, ctx) => {

      if (
        data.checkOutDate <=
        data.checkInDate
      ) {

        ctx.addIssue({

          code: z.ZodIssueCode.custom,

          path: ["checkOutDate"],

          message:
            "Check out date must be after check in date."

        });

      }

    }

  );