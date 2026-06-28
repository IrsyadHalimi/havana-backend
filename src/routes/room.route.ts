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
  deleteRoomCtrl,
  update
} from "../controllers/room/room.controller";

import {
  createRoomSchema
} from "../validators/room/create-room.validator";

const router = Router();

router.use(authMiddleware);

router.use(
  roleMiddleware("tenant")
);

router.post(
  "/properties/:propertyId/rooms",
  validate(createRoomSchema),
  asyncHandler(
    create
  )
);

router.get(
  "/properties/:propertyId/rooms",
  asyncHandler(
    list
  )
);

router.get(
  "/rooms/:id",
  asyncHandler(
    detail
  )
);

router.patch(
  "/rooms/:id",
  asyncHandler(
    update
  )
);

router.delete(
  "/rooms/:id",
  asyncHandler(
    deleteRoomCtrl
  )
);

export default router;