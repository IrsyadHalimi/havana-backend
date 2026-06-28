import { Prisma } from "@prisma/client";

import { prisma } from "../../config/prisma";

import {
  ReservationStatus
} from "@prisma/client";

export const createReservation = (
  tx: Prisma.TransactionClient,
  data: Prisma.ReservationUncheckedCreateInput
) => {

  return tx.reservation.create({

    data

  });

};

export const createReservationDetails = (
  tx: Prisma.TransactionClient,
  data: Prisma.ReservationDetailUncheckedCreateInput[]
) => {

  return tx.reservationDetail.createMany({

    data

  });

};

export const findReservationProperty = (
  propertyId: string
) => {

  return prisma.property.findFirst({

    where: {

      id: propertyId,

      deletedAt: null

    }

  });

};

export const findReservationRoom = (
  roomId: string
) => {

  return prisma.propertyRoom.findFirst({

    where: {

      id: roomId,

      deletedAt: null

    }

  });

};

export const findReservationByOrderNumber = (
  orderNumber: string
) => {

  return prisma.reservation.findUnique({

    where: {

      orderNumber

    }

  });

};

export const findReservationPropertyById = (
  propertyId: string
) => {
  return prisma.property.findFirst({
    where: {
      id: propertyId,
      deletedAt: null
    }
  });
};

export const findReservationRoomById = (
  roomId: string
) => {
  return prisma.propertyRoom.findFirst({
    where: {
      id: roomId,
      deletedAt: null
    },
    include: {
      property: true
    }
  });
};

export const createReservationHistory = (
  tx: Prisma.TransactionClient,
  data: Prisma.ReservationStatusHistoryUncheckedCreateInput
) => {

  return tx.reservationStatusHistory.create({

    data

  });

};

export const findReservationConflicts = (
  roomId: string,
  checkInDate: Date,
  checkOutDate: Date
) => {

  return prisma.reservation.findMany({

    where: {

      roomId,

      status: {

        in: [

          ReservationStatus.waiting_payment,

          ReservationStatus.waiting_confirmation,

          ReservationStatus.confirmed

        ]

      },

      AND: [

        {

          checkInDate: {

            lt: checkOutDate

          }

        },

        {

          checkOutDate: {

            gt: checkInDate

          }

        }

      ]

    }

  });

};

interface FindUserReservationsParams {

  userId: string;

  status?: ReservationStatus;

  orderNumber?: string;

  startDate?: Date;

  endDate?: Date;

  skip: number;

  take: number;

}

export const findUserReservations = (
  params: FindUserReservationsParams
) => {

  const {

    userId,

    status,

    orderNumber,

    startDate,

    endDate,

    skip,

    take

  } = params;

  const where: Prisma.ReservationWhereInput = {

    userId,

    ...(status && {

      status

    }),

    ...(orderNumber && {

      orderNumber: {

        contains: orderNumber,

        mode: "insensitive"

      }

    }),

    ...(startDate &&
      endDate && {

      createdAt: {

        gte: startDate,

        lte: endDate

      }

    })

  };

  return prisma.reservation.findMany({

    where,

    skip,

    take,

    orderBy: {

      createdAt: "desc"

    },

    include: {

      property: {

        select: {

          id: true,

          name: true,

          city: true,

          coverImage: true

        }

      },

      room: {

        select: {

          id: true,

          name: true

        }

      },

      payments: {

        select: {

          id: true,

          status: true,

          paymentMethod: true,

          imageUrl: true

        }

      }

    }

  });

};

export const countUserReservations = (
  params: Omit<
    FindUserReservationsParams,
    "skip" | "take"
  >
) => {

  const {

    userId,

    status,

    orderNumber,

    startDate,

    endDate

  } = params;

  const where: Prisma.ReservationWhereInput = {

    userId,

    ...(status && {

      status

    }),

    ...(orderNumber && {

      orderNumber: {

        contains: orderNumber,

        mode: "insensitive"

      }

    }),

    ...(startDate &&
      endDate && {

      createdAt: {

        gte: startDate,

        lte: endDate

      }

    })

  };

  return prisma.reservation.count({

    where

  });

};

export const findReservationByUser = (
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