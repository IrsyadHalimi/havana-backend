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
  CreatePropertyController
} from "../controllers/property/create-property.controller";

import {
  ListPropertyController
} from "../controllers/property/list-property.controller";

import {
  DetailPropertyController
} from "../controllers/property/detail-property.controller";

import {
  UpdatePropertyController
} from "../controllers/property/update-property.controller";

import {
  DeletePropertyController
} from "../controllers/property/delete-property.controller";

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
    new CreatePropertyController()
      .handle
  )
);

router.get(
  "/",
  asyncHandler(
    new ListPropertyController()
      .handle
  )
);

router.get(
  "/:id",
  asyncHandler(
    new DetailPropertyController()
      .handle
  )
);

router.patch(
  "/:id",
  validate(updatePropertySchema),
  asyncHandler(
    new UpdatePropertyController()
      .handle
  )
);

router.delete(
  "/:id",
  asyncHandler(
    new DeletePropertyController()
      .handle
  )
);

export default router;