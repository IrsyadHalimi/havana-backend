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

import { DetailCategoryController }
from "../controllers/property-category/detail-category.controller";

import { UpdateCategoryController }
from "../controllers/property-category/update-category.controller";

import { DeleteCategoryController }
from "../controllers/property-category/delete-category.controller";

import { updateCategorySchema }
from "../validators/property-category/update-category.validator";

const router = Router();

const createController =
  new CreateCategoryController();

const listController =
  new ListCategoryController();

const detailController =
  new DetailCategoryController();

const updateController =
  new UpdateCategoryController();

const deleteController =
  new DeleteCategoryController();

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

router.get(
  "/:id",
  asyncHandler(
    detailController.handle
  )
);

router.patch(
  "/:id",
  validate(
    updateCategorySchema
  ),
  asyncHandler(
    updateController.handle
  )
);

router.delete(
  "/:id",
  asyncHandler(
    deleteController.handle
  )
);

export default router;