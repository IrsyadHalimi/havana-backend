interface UploadPaymentProofParams {

  reservationId: string;

  userId: string;

  paymentMethod: string;

  imageUrl: string;

}

import {
  prisma
} from "../../config/prisma";

import {
  PaymentStatus,
  ReservationStatus
} from "@prisma/client";

import {
  NotFoundError
} from "../../errors/not-found.error";

import {
  findReservationForPayment,
  createPayment,
  updateReservationStatus,
  createPaymentHistory
} from "../../repositories/payment/payment.repository";

export const uploadPaymentProofService = async ({
  reservationId,
  userId,
  paymentMethod,
  imageUrl
}: UploadPaymentProofParams) => {

  const reservation =
    await findReservationForPayment(
      reservationId,
      userId
    );

  if (!reservation) {

    throw NotFoundError(
      "Reservation not found."
    );

  }

  if (
    reservation.status !==
    ReservationStatus.waiting_payment
  ) {

    throw NotFoundError(
      "Payment has already been uploaded."
    );

  }

  return prisma.$transaction(

    async (tx) => {

      await createPayment(
        tx,
        {

          reservationId,

          paymentMethod,

          amount:
            reservation.totalPrice,

          imageUrl,

          status:
            PaymentStatus.waiting_confirmation

        }
      );

      await updateReservationStatus(
        tx,
        reservation.id
      );

      await createPaymentHistory(
        tx,
        reservation.id
      );

      return true;

    }

  );

};