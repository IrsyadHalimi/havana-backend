import {
  Request,
  Response
} from "express";

import {
  CreatePropertyService
} from "../../services/property/create-property.service";

export class CreatePropertyController {

  async handle(
    req: Request,
    res: Response
  ) {

    const service =
      new CreatePropertyService();

    const result =
      await service.execute(
        req.user!.id,
        req.body
      );

    return res
      .status(201)
      .json(result);
  }
}