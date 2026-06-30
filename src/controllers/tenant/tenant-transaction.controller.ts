import {
  Response
} from "express";

import { AuthRequest } from "../../interfaces/auth/auth-request.interface";

import { getTenantTransactionsService } from "../../services/tenant/get-tenant-transaction.service";

import { ReservationStatus } from "@prisma/client";

export const getTenantTransactions = async (
  req: AuthRequest,
  res: Response
) => {

  const result =
    await getTenantTransactionsService({

      tenantId: req.user.id,

      page: Number(req.query.page ?? 1),

      limit: Number(req.query.limit ?? 10),

      status: req.query.status as ReservationStatus,

      propertyId: req.query.propertyId as string,

      orderNumber: req.query.orderNumber as string

    });

  return res.json({

    success: true,

    data: result

  });

};