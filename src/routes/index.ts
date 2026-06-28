import { Router } from "express";

import authRoute from "./auth.route";

import availabilityRoute from "./availability.route";

import profileRoute from "./profile.route";

import propertyRoute from "./property.route";

import propertyCategoryRoute from "./property-category.route";

import roomRoute from "./room.route";

import reservationRoute
from "./reservation.route";


const router = Router();

router.get("/", (req, res) => {
  return res.json({
    success: true,
    message:
      "Event Management API Running"
  });
});

router.use(
  "/auth",
  authRoute
);

router.use(
  "/profile",
  profileRoute
);

router.use(
  "/availabilities",
  availabilityRoute
);

router.use(
  "/properties",
  propertyRoute
);

router.use(
  "/property-categories",
  propertyCategoryRoute
);

router.use(
  "/room",
  roomRoute
);

router.use(
  "/reservations",
  reservationRoute
);

export default router;