import { Router } from "express";

import { authMiddleware }
from "../middleware/auth.middleware";

import { roleMiddleware }
from "../middleware/role.middleware";

import { validate }
from "../middleware/validation.middleware";

import { asyncHandler }
from "../utils/async-handler";

import { create, detail, list, deleteCategoryCtrl, update }
from "../controllers/property-category/property-category.controller";

import { createCategorySchema }
from "../validators/property-category/create-category.validator";

import { updateCategorySchema }
from "../validators/property-category/update-category.validator";

const router = Router();

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
  validate(
    updateCategorySchema
  ),
  asyncHandler(
    update
  )
);

router.delete(
  "/:id",
  asyncHandler(
    deleteCategoryCtrl
  )
);

export default router;