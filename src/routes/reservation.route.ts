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
  uploadSingle
} from "../middleware/upload.middleware"

import {
  UserRole
} from "@prisma/client";

import {
  createReservationSchema
} from "../validators/reservation/create-reservation.validator";

import {
  uploadPaymentProofSchema
} from "../validators/reservation/upload-payment.validator";

import {
  uploadPaymentProof
} from "../controllers/reservation/reservation.controller";

import {
  createReservation
} from "../controllers/reservation/reservation.controller";

import {
  getUserTransactionsSchema
} from "../validators/reservation/get-user-transaction.validator"

import {
  getUserTransactions
} from "../controllers/reservation/reservation.controller"

import {
  cancelReservation
} from "../controllers/reservation/reservation.controller"

const router = Router();

router.post(

  "/",

  authMiddleware,

  roleMiddleware(UserRole.customer),

  validate(
    createReservationSchema
  ),

  createReservation as any

);

router.post(

    "/:id/payment-proof",

    authMiddleware,

    roleMiddleware(UserRole.customer),

    uploadSingle("image"),

    validate(uploadPaymentProofSchema),

    uploadPaymentProof as any

);

router.get(

  "/user",

  authMiddleware,

  roleMiddleware(UserRole.customer),

  validate(

    getUserTransactionsSchema

  ),

  getUserTransactions as any

);

router.post(

  "/:id/cancel",

  authMiddleware,

  roleMiddleware(UserRole.customer),

  cancelReservation as any

);

export default router;