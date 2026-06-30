import {
  PaymentStatus,
  ReservationStatus
} from "@prisma/client";

import { prisma } from "../../config/prisma";

import { NotFoundError } from "../../errors/not-found.error";

import {
  findOrderForVerification,
  updatePaymentStatus,
  createNotification
} from "../../repositories/tenant/tenant-order-repository";

import {
  updateReservationStatus,
  createReservationHistory
} from "../../repositories/reservation/reservation.repository";

// import { sendPaymentApprovedEmail } from "../../providers/mail/send-payment-approved-email";
// import { sendPaymentRejectedEmail } from "../../providers/mail/send-payment-rejected-email";

interface VerifyPaymentParams {
  reservationId: string;
  tenantId: string;
  status: "approved" | "rejected";
  reason?: string;
}

export const verifyPaymentService = async ({
  reservationId,
  tenantId,
  status,
  reason
}: VerifyPaymentParams) => {

  const reservation =
    await findOrderForVerification(
      reservationId,
      tenantId
    );

  if (!reservation) {

    throw NotFoundError(
      "Reservation not found."
    );

  }

  const payment =
    reservation.payments[0];

  if (!payment) {

    throw NotFoundError(
      "Payment not found."
    );

  }

  if (
    reservation.status !==
    ReservationStatus.waiting_confirmation
  ) {

    throw NotFoundError(
      "Reservation cannot be verified."
    );

  }

  if (
    payment.status !==
    PaymentStatus.waiting_confirmation
  ) {

    throw NotFoundError(
      "Payment cannot be verified."
    );

  }

  const reservationStatus =
    status === "approved"
      ? ReservationStatus.confirmed
      : ReservationStatus.waiting_payment;

  const paymentStatus =
    status === "approved"
      ? PaymentStatus.approved
      : PaymentStatus.rejected;

  await prisma.$transaction(

    async (tx) => {

      await updatePaymentStatus(

        tx,

        {

          paymentId:
            payment.id,

          status:
            paymentStatus,

          reviewedBy:
            tenantId,

          paidAt:

            status === "approved"

              ? new Date()

              : null

        }

      );

      await updateReservationStatus(

        tx,

        reservation.id,

        reservationStatus

      );

      await createReservationHistory(

        tx,

        {

          reservationId:
            reservation.id,

          oldStatus:
            reservation.status,

          newStatus:
            reservationStatus

        }

      );

      await createNotification(

        tx,

        reservation.userId,

        status === "approved"
          ? "Payment Approved"
          : "Payment Rejected",

        status === "approved"
          ? "Your reservation has been confirmed."
          : reason ??
            "Payment was rejected. Please upload another payment proof."

      );

      if (status === "approved") {

        await createNotification(

          tx,

          reservation.userId,

          "Payment Approved",

          `Your payment for order ${reservation.orderNumber}
        has been approved.
        Your reservation has been confirmed.`

        );

      } else {

        await createNotification(

          tx,

          reservation.userId,

          "Payment Rejected",

          reason ??

          `Payment for order
        ${reservation.orderNumber}
        was rejected.
        Please upload a new payment proof.`

        );

      }

    }

  );


};