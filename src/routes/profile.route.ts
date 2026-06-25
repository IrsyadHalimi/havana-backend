import { Router } from "express";

import { authMiddleware }
from "../middleware/auth.middleware";

import { GetProfileController }
from "../controllers/profile/get-profile.controller";

import { asyncHandler }
from "../utils/async-handler";

const router = Router();

const controller =
  new GetProfileController();

router.get(
  "/me",
  authMiddleware,
  asyncHandler(
    controller.handle
  )
);

export default router;