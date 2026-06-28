import {
  Request,
  Response,
} from "express";

import {
  createAvailabilityService,
} from "../../services/availability/create-availability.service";

export const createAvailability = async (
  req: Request,
  res: Response
) => {
  const result = await createAvailabilityService().execute(
    req.user!.id,
    req.params.id as string,
    req.body
  );

  return res
    .status(201)
    .json(result);
};