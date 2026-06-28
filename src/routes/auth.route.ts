import { Router }
from "express";

import { login, register, resendVerification, verifyEmail }
from "../controllers/auth/auth.controller";

import { validate }
from "../middleware/validation.middleware";

import { registerSchema }
from "../validators/auth/register.validator";

import { resendVerificationSchema }
from "../validators/auth/resend-verification.validator";

import { asyncHandler }
from "../utils/async-handler";

import { verifyEmailSchema }
from "../validators/auth/verify-email.validator";

const router = Router();

router.post(
  "/login",
  login
);

router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(
    register
  )
);

router.post(
  "/verify-email",
  validate(verifyEmailSchema),
  asyncHandler(
    verifyEmail
  )
);

router.post(
  "/resend-verification",
  validate(
    resendVerificationSchema
  ),
  asyncHandler(
    resendVerification
  )
);

export default router;