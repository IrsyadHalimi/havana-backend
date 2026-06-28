import { Router } from "express";

import { validate }
from "../middleware/validation.middleware";

import { authMiddleware }
from "../middleware/auth.middleware";

import { changePassword, getProfile, reverifyEmail }
from "../controllers/profile/profile.controller";

import { asyncHandler }
from "../utils/async-handler";

import { changePasswordSchema }
from "../validators/profile/change-password.validator";

const router = Router();

router.get(
  "/me",
  authMiddleware,
  asyncHandler(
    getProfile
  )
);

router.patch(
  "/change-password",
  authMiddleware,
  validate(
    changePasswordSchema
  ),
  asyncHandler(
    changePassword
  )
);

router.post(
  "/reverify-email",
  authMiddleware,
  asyncHandler(
    reverifyEmail
  )
);

export default router;