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
  CreateRoomController
} from "../controllers/room/create-room.controller";

import {
  ListRoomController
} from "../controllers/room/list-room.controller";

import {
  DetailRoomController
} from "../controllers/room/detail-room.controller";

import {
  UpdateRoomController
} from "../controllers/room/update-room.controller";

import {
  DeleteRoomController
} from "../controllers/room/delete-room.controller";

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
    new CreateRoomController()
      .handle
  )
);

router.get(
  "/properties/:propertyId/rooms",
  asyncHandler(
    new ListRoomController()
      .handle
  )
);

router.get(
  "/rooms/:id",
  asyncHandler(
    new DetailRoomController()
      .handle
  )
);

router.patch(
  "/rooms/:id",
  asyncHandler(
    new UpdateRoomController()
      .handle
  )
);

router.delete(
  "/rooms/:id",
  asyncHandler(
    new DeleteRoomController()
      .handle
  )
);

export default router;