import { AuthRequest } from "../../interfaces/auth/auth-request.interface";
import { verifyPaymentService } from "../../services/tenant/verify-payment.service"
import {
  Response
} from "express";

export const verifyPayment = async (
  req: AuthRequest,
  res: Response
) => {

  const result =
    await verifyPaymentService({

      reservationId:
        req.params.id as string,

      tenantId:
        req.user.id,

      status:
        req.body.status,

      reason:
        req.body.reason

    });

  return res.json({

    success: true,

    message:
      "Payment verified successfully.",

    data:
      result

  });

};