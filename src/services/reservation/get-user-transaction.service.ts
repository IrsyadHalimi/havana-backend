import {

  findUserReservations,

  countUserReservations

} from "../../repositories/reservation/reservation.repository";

import {
  ReservationStatus
} from "@prisma/client";

interface GetUserTransactionsParams {

  userId: string;

  page: number;

  limit: number;

  status?: ReservationStatus;

  orderNumber?: string;

  startDate?: Date;

  endDate?: Date;

}

export const getUserTransactionsService =
async (

params: GetUserTransactionsParams

) => {

  const skip =
    (params.page - 1)
    * params.limit;

  const [

    items,

    total

  ] = await Promise.all([

    findUserReservations({

      ...params,

      skip,

      take: params.limit

    }),

    countUserReservations(params)

  ]);

  return {

    items,

    pagination: {

      page: params.page,

      limit: params.limit,

      total,

      totalPages:

        Math.ceil(
          total /
          params.limit
        )

    }

  };

};