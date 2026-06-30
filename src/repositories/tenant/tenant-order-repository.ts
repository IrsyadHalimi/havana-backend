import { prisma } from "../../config/prisma";

import {
  PaymentStatus,
  Prisma,
  ReservationStatus
} from "@prisma/client";

export const findOrderForVerification = (
  reservationId: string,
  tenantId: string
) => {

  return prisma.reservation.findFirst({

    where: {

      id: reservationId,

      property: {

        tenantId

      }

    },

    include: {

      user: true,

      property: true,

      room: true,

      payments: {

        orderBy: {

          createdAt: "desc"

        },

        take: 1

      }

    }

  });

};

interface UpdatePaymentStatusParams {

  paymentId: string;

  status: PaymentStatus;

  reviewedBy?: string;

  paidAt?: Date | null;

}

export const updatePaymentStatus = (
  tx: Prisma.TransactionClient,
  {
    paymentId,
    status,
    reviewedBy,
    paidAt
  }: UpdatePaymentStatusParams
) => {

  return tx.payment.update({

    where: {

      id: paymentId

    },

    data: {

      status,

      reviewedBy,

      paidAt

    }

  });

};

export const updateReservationStatus = (
  tx: Prisma.TransactionClient,
  reservationId: string,
  status: ReservationStatus
) => {

  return tx.reservation.update({

    where: {

      id: reservationId

    },

    data: {

      status

    }

  });

};

export const createNotification = (
  tx: Prisma.TransactionClient,
  userId: string,
  title: string,
  message: string
) => {

  return tx.notification.create({

    data: {

      userId,

      title,

      message

    }

  });

};