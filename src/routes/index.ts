import { Router } from "express";

import authRoute from "./auth.route";

import availabilityRoute from "./availability.route";

import profileRoute from "./profile.route";

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
  "/availibility",
  availabilityRoute
);

export default router;