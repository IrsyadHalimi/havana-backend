import {
  prisma
} from "../../config/prisma";

import {
  Prisma,
  ReservationStatus
} from "@prisma/client";

interface FindTenantReservationsParams {

  tenantId: string;

  page: number;

  limit: number;

  status?: ReservationStatus;

  propertyId?: string;

  orderNumber?: string;

}

export const findTenantReservations = (
  params: FindTenantReservationsParams
) => {

  const {

    tenantId,

    page,

    limit,

    status,

    propertyId,

    orderNumber

  } = params;

  const where: Prisma.ReservationWhereInput = {

    property: {

      tenantId

    },

    ...(status && {

      status

    }),

    ...(propertyId && {

      propertyId

    }),

    ...(orderNumber && {

      orderNumber: {

        contains: orderNumber,

        mode: "insensitive"

      }

    })

  };

  return prisma.reservation.findMany({

    where,

    skip:

      (page - 1)

      * limit,

    take:

      limit,

    orderBy: {

      createdAt: "desc"

    },

    include: {

      user: {

        select: {

          id: true,

          fullName: true,

          email: true,

          phone: true

        }

      },

      property: {

        select: {

          id: true,

          name: true

        }

      },

      room: {

        select: {

          id: true,

          name: true

        }

      },

      payments: true

    }

  });

};

export const countTenantReservations = (params: Omit<FindTenantReservationsParams, "page" | "limit">) => {

  const where: Prisma.ReservationWhereInput = {

    property: {

      tenantId: params.tenantId

    },

    ...(params.status && {

      status: params.status

    }),

    ...(params.propertyId && {

      propertyId: params.propertyId

    }),

    ...(params.orderNumber && {

      orderNumber: {

        contains: params.orderNumber,

        mode: "insensitive"

      }

    })

  };

  return prisma.reservation.count({

    where

  });

};