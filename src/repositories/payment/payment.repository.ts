import {
  prisma
} from "../../config/prisma";

import {
  Prisma
} from "@prisma/client";

export const findReservationForPayment = (
  reservationId: string,
  userId: string
) => {

  return prisma.reservation.findFirst({

    where: {

      id: reservationId,

      userId

    }

  });

};


export const createPayment = (
  tx: Prisma.TransactionClient,
  data: Prisma.PaymentUncheckedCreateInput
) => {

  return tx.payment.create({

    data

  });

};

export const updateReservationStatus = (
  tx: Prisma.TransactionClient,
  reservationId: string
) => {

  return tx.reservation.update({

    where: {

      id: reservationId

    },

    data: {

      status:
        "waiting_confirmation"

    }

  });

};

export const createPaymentHistory = (
  tx: Prisma.TransactionClient,
  reservationId: string
) => {

  return tx.reservationStatusHistory.create({

    data: {

      reservationId,

      oldStatus:
        "waiting_payment",

      newStatus:
        "waiting_confirmation"

    }

  });

};