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
  RoomController
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
    new RoomController()
      .create
  )
);

router.get(
  "/properties/:propertyId/rooms",
  asyncHandler(
    new RoomController()
      .list
  )
);

router.get(
  "/rooms/:id",
  asyncHandler(
    new RoomController()
      .detail
  )
);

router.patch(
  "/rooms/:id",
  asyncHandler(
    new RoomController()
      .update
  )
);

router.delete(
  "/rooms/:id",
  asyncHandler(
    new RoomController()
      .delete
  )
);

export default router;