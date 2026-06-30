import {
  countTenantReservations,
  findTenantReservations
} from "../../repositories/tenant/tenant-transaction.repository";

import {
  ReservationStatus
} from "@prisma/client";

interface GetTenantTransactionsParams {
  tenantId: string;
  page: number;
  limit: number;
  status?: ReservationStatus;
  propertyId?: string;
  orderNumber?: string;
}

export const getTenantTransactionsService = async (
  params: GetTenantTransactionsParams
) => {

  const {
    page,
    limit
  } = params;

  const [
    items,
    total
  ] = await Promise.all([

    findTenantReservations(params),

    countTenantReservations(params)

  ]);

  return {

    items,

    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }

  };

};