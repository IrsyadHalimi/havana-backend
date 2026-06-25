import {
  Request,
  Response
} from "express";

import {
  ListPropertyService
} from "../../services/property/list-property.service";

export class ListPropertyController {

  async handle(
    req: Request,
    res: Response
  ) {

    const service =
      new ListPropertyService();

    const result =
      await service.execute(
        req.user!.id,
        req.query
      );

    return res.json(result);
  }
}