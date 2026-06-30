import { z } from "zod";

const VerifyStatus = z.enum([
  "approved",
  "rejected"
]);

export const verifyPaymentSchema = z.object({

  status: VerifyStatus,

  reason: z.string().optional()

}).superRefine((value, ctx) => {

  if (
    value.status === "rejected" &&
    !value.reason?.trim()
  ) {

    ctx.addIssue({

      code: z.ZodIssueCode.custom,

      path: ["reason"],

      message:
        "Reason is required."

    });

  }

});