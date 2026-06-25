import { Router } from "express";

import { validate }
from "../middleware/validation.middleware";

import { authMiddleware }
from "../middleware/auth.middleware";

import { GetProfileController }
from "../controllers/profile/get-profile.controller";

import { asyncHandler }
from "../utils/async-handler";

import { ChangePasswordController }
from "../controllers/profile/change-password.controller";

import { changePasswordSchema }
from "../validators/profile/change-password.validator";

import { ChangeEmailController }
from "../controllers/profile/change-email.controller";

import { changeEmailSchema }
from "../validators/profile/change-email.validator";

import { ReverifyEmailController }
from "../controllers/profile/reverify-email.controller";

const router = Router();

const controller =
  new GetProfileController();

const changePasswordController =
  new ChangePasswordController();

const changeEmailController =
  new ChangeEmailController();

const reverifyEmailController =
  new ReverifyEmailController();

router.get(
  "/me",
  authMiddleware,
  asyncHandler(
    controller.handle
  )
);

router.patch(
  "/change-password",
  authMiddleware,
  validate(
    changePasswordSchema
  ),
  asyncHandler(
    changePasswordController.handle
  )
);

router.patch(
  "/change-email",
  authMiddleware,
  validate(
    changeEmailSchema
  ),
  asyncHandler(
    changeEmailController.handle
  )
);

router.post(
  "/reverify-email",
  authMiddleware,
  asyncHandler(
    reverifyEmailController.handle
  )
);

export default router;