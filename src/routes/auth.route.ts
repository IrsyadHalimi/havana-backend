import { Router }
from "express";

import { LoginController }
from "../controllers/auth/login.controller";

import { RegisterController }
from "../controllers/auth/register.controller";

import { validate }
from "../middleware/validation.middleware";

import { registerSchema }
from "../validators/auth/register.validator";

import { resendVerificationSchema }
from "../validators/auth/resend-verification.validator";

import { asyncHandler }
from "../utils/async-handler";

import { VerifyEmailController }
from "../controllers/auth/verify-email.controller";

import { ResendVerificationController }
from "../controllers/auth/resend-verification.controller";

import { verifyEmailSchema }
from "../validators/auth/verify-email.validator";

const router = Router();

const loginController =
 new LoginController();

const registerController =
 new RegisterController();

const verifyEmailController =
  new VerifyEmailController();

const resendVerificationController =
  new ResendVerificationController();

  
router.post(
  "/login",
  loginController.handle
);

router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(
    registerController.handle
  )
);

router.post(
  "/verify-email",
  validate(verifyEmailSchema),
  asyncHandler(
    verifyEmailController.handle
  )
);

router.post(
  "/resend-verification",
  validate(
    resendVerificationSchema
  ),
  asyncHandler(
    resendVerificationController
      .handle
  )
);

export default router;