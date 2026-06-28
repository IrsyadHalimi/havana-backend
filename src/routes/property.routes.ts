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
  PropertyController
} from "../controllers/property/property.controller";

import {
  createPropertySchema
} from "../validators/property/create-property.validator";

import {
  updatePropertySchema
} from "../validators/property/update-property.validator";

const router = Router();

const controller = new PropertyController();

router.use(authMiddleware);

router.use(
  roleMiddleware("tenant")
);

router.post(
  "/",
  validate(createPropertySchema),
  asyncHandler(
    controller.create
  )
);

router.get(
  "/",
  asyncHandler(
    controller.list
  )
);

router.get(
  "/:id",
  asyncHandler(
    controller.detail
  )
);

router.patch(
  "/:id",
  validate(updatePropertySchema),
  asyncHandler(
    controller.update
  )
);

router.delete(
  "/:id",
  asyncHandler(
    controller.delete
  )
);

export default router;