import { z } from "zod";

export const uploadPaymentProofSchema =
  z.object({

    paymentMethod:
      z.string().min(1)

  });