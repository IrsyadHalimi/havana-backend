import { Router } from "express";

import { authMiddleware }
from "../middleware/auth.middleware";

import { roleMiddleware }
from "../middleware/role.middleware";

import { validate }
from "../middleware/validation.middleware";

import { asyncHandler }
from "../utils/async-handler";

import { PropertyCategoryController }
from "../controllers/property-category/property-category.controller";

import { createCategorySchema }
from "../validators/property-category/create-category.validator";

import { updateCategorySchema }
from "../validators/property-category/update-category.validator";

const router = Router();

const controller =
  new PropertyCategoryController();

router.use(
  authMiddleware
);

router.use(
  roleMiddleware("tenant")
);

router.post(
  "/",
  validate(
    createCategorySchema
  ),
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
  validate(
    updateCategorySchema
  ),
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