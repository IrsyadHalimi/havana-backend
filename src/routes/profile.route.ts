import { Router } from "express";

import { validate }
from "../middleware/validation.middleware";

import { authMiddleware }
from "../middleware/auth.middleware";

import { ProfileController }
from "../controllers/profile/profile.controller";

import { asyncHandler }
from "../utils/async-handler";

import { changePasswordSchema }
from "../validators/profile/change-password.validator";

import { changeEmailSchema }
from "../validators/profile/change-email.validator";

const router = Router();

const controller =
  new ProfileController();

router.get(
  "/me",
  authMiddleware,
  asyncHandler(
    controller.getProfile
  )
);

router.patch(
  "/change-password",
  authMiddleware,
  validate(
    changePasswordSchema
  ),
  asyncHandler(
    controller.changePassword
  )
);

router.patch(
  "/change-email",
  authMiddleware,
  validate(
    changeEmailSchema
  ),
  asyncHandler(
    controller.changeEmail
  )
);

router.post(
  "/reverify-email",
  authMiddleware,
  asyncHandler(
    controller.reverifyEmail
  )
);

export default router;