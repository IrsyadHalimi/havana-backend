import { prisma } from "../../config/prisma";

import {
  ReservationStatus
} from "@prisma/client";

import {
  NotFoundError
} from "../../errors/not-found.error";

import {

  findReservationByUser,

  updateReservationStatus,

  createReservationHistory

} from "../../repositories/reservation/reservation.repository";

interface CancelReservationParams {

  reservationId: string;

  userId: string;

}

export const cancelReservationService = async ({
  reservationId,
  userId
}: CancelReservationParams) => {

  const reservation =
    await findReservationByUser(
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
      "Reservation cannot be cancelled."
    );

  }

  return prisma.$transaction(

    async (tx) => {

      await updateReservationStatus(

        tx,

        reservation.id,

        ReservationStatus.cancelled

      );

      await createReservationHistory(

        tx,

        {

          reservationId:
            reservation.id,

          oldStatus:
            reservation.status,

          newStatus:
            ReservationStatus.cancelled

        }

      );

      return true;

    }

  );

};