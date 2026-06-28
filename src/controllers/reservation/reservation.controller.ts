import {
  Request,
  Response
} from "express";

import {
  createReservationService
} from "../../services/reservation/create-reservation.service";

import { AuthRequest } from "../../interfaces/auth/auth-request.interface";

import { uploadPaymentProofService } from "../../services/payment/upload-payment-proof.service";

import {
  saveUploadedFile
} from "../../services/storage/storage.service";

import {
  getUserTransactionsService
} from "../../services/reservation/get-user-transaction.service"

import {
  cancelReservationService
} from "../../services/reservation/cancel-reservation.service";

export const createReservation = async (
  req: AuthRequest,
  res: Response
) => {

  const reservation =
    await createReservationService({

      userId: req?.user?.id as string,

      propertyId: req.body.propertyId,

      roomId: req.body.roomId,

      checkInDate: new Date(req.body.checkInDate),

      checkOutDate: new Date(req.body.checkOutDate),

      totalGuests: req.body.totalGuests

    });

  return res.status(201).json({

    success: true,

    message: "Reservation created successfully.",

    data: reservation

  });

};

export const uploadPaymentProof = async (
  req: AuthRequest,
  res: Response
) => {
  const uploaded =
    saveUploadedFile(req.file!);

  await uploadPaymentProofService({

    reservationId: req.params.id as string,

    userId: req.user.id,

    paymentMethod: req.body.paymentMethod,

    imageUrl: uploaded?.url || ""

  });

  return res.json({

    success: true,

    message: "Payment proof uploaded successfully."

  });

};

export const getUserTransactions =
async (

  req: AuthRequest,

  res: Response

) => {

const data =
await getUserTransactionsService({

    userId:
      req.user.id,

    page:
      Number(req.query.page ?? 1),

    limit:
      Number(req.query.limit ?? 10),

    status:
      req.query.status as any,

    orderNumber:
      req.query.orderNumber as string,

    startDate:
      req.query.startDate
        ? new Date(req.query.startDate as string)
        : undefined,

    endDate:
      req.query.endDate
        ? new Date(req.query.endDate as string)
        : undefined

});

return res.json({

    success:true,

    data

});

};

export const cancelReservation = async (
  req: AuthRequest,
  res: Response
) => {

  await cancelReservationService({

    reservationId:
      req.params.id as string,

    userId:
      req.user.id

  });

  return res.json({

    success: true,

    message:
      "Reservation cancelled successfully."

  });

};