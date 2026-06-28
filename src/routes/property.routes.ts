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
  create,
  detail,
  list,
  deleteCtrl,
  update,
} from "../controllers/property/property.controller";

import {
  createPropertySchema
} from "../validators/property/create-property.validator";

import {
  updatePropertySchema
} from "../validators/property/update-property.validator";

const router = Router();

router.use(authMiddleware);

router.use(
  roleMiddleware("tenant")
);

router.post(
  "/",
  validate(createPropertySchema),
  asyncHandler(
    create
  )
);

router.get(
  "/",
  asyncHandler(
    list
  )
);

router.get(
  "/:id",
  asyncHandler(
    detail
  )
);

router.put(
  "/:id",
  validate(updatePropertySchema),
  asyncHandler(
    update
  )
);

router.delete(
  "/:id",
  asyncHandler(
    deleteCtrl
  )
);

export default router;