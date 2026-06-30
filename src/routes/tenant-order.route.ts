import {
  Router
} from "express";

import {
  authMiddleware
} from "../middleware/auth.middleware";

import {
  roleMiddleware
} from "../middleware/role.middleware"

import {
  validate
} from "../middleware/validation.middleware";

import {
  UserRole
} from "@prisma/client";

import {
  verifyPaymentSchema
} from "../validators/tenant/verify-payment.validator"

import {
  verifyPayment
} from "../controllers/tenant/tenant-order.controller"

const router = Router();

router.post(

  "/:id/verify",

  authMiddleware,

  roleMiddleware(
    UserRole.tenant
  ),

  validate(
    verifyPaymentSchema
  ),

  verifyPayment as any

);