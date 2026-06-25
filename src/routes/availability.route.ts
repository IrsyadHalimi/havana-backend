import { Router } from "express";

import { authMiddleware }
from "../middleware/auth.middleware";

import { roleMiddleware }
from "../middleware/role.middleware";

import { validate }
from "../middleware/validation.middleware";

import { asyncHandler }
from "../utils/async-handler";

import {
  CreateAvailabilityController
}
from "../controllers/availability/create-availability.controller";

import {
  createAvailabilitySchema
}
from "../validators/availability/create-availability.validator";

const router = Router();

router.use(authMiddleware);

router.use(
  roleMiddleware("tenant")
);

router.post(
  "/rooms/:id/availability",
  validate(
    createAvailabilitySchema
  ),
  asyncHandler(
    new CreateAvailabilityController()
      .handle
  )
);

export default router;