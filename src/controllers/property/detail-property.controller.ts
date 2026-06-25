import {
  Request,
  Response
} from "express";

import {
  DetailPropertyService
} from "../../services/property/detail-property.service";

export class DetailPropertyController {

  async handle(
    req: Request,
    res: Response
  ) {

    const service =
      new DetailPropertyService();

    const result =
      await service.execute(
        req.user!.id,
        req.params.id as string
      );

    return res.json(result);
  }
}