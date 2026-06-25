import {
  Request,
  Response
} from "express";

import {
  UpdatePropertyService
} from "../../services/property/update-property.service";

export class UpdatePropertyController {

  async handle(
    req: Request,
    res: Response
  ) {

    const service =
      new UpdatePropertyService();

    const result =
      await service.execute(
        req.user!.id,
        req.params.id as string,
        req.body
      );

    return res.json(result);
  }
}