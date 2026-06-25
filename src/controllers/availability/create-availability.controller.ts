import {
  Request,
  Response
} from "express";

import {
  CreateAvailabilityService
} from "../../services/availability/create-availability.service";

export class CreateAvailabilityController {

  async handle(
    req: Request,
    res: Response
  ) {

    const service =
      new CreateAvailabilityService();

    const result =
      await service.execute(
        req.user!.id,
        req.params.id as string,
        req.body
      );

    return res
      .status(201)
      .json(result);
  }
}