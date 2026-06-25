import { Router } from "express";

import { authMiddleware }
from "../middleware/auth.middleware";

import { roleMiddleware }
from "../middleware/role.middleware";

import { validate }
from "../middleware/validation.middleware";

import { asyncHandler }
from "../utils/async-handler";

import { CreateCategoryController }
from "../controllers/property-category/create-category.controller";

import { ListCategoryController }
from "../controllers/property-category/list-category.controller";

import { createCategorySchema }
from "../validators/property-category/create-category.validator";

const router = Router();

const createController =
  new CreateCategoryController();

const listController =
  new ListCategoryController();

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
    createController.handle
  )
);

router.get(
  "/",
  asyncHandler(
    listController.handle
  )
);

export default router;