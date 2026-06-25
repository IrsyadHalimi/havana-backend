import {
  Request,
  Response
} from "express";

import {
  DeletePropertyService
} from "../../services/property/delete-property.service";

export class DeletePropertyController {

  async handle(
    req: Request,
    res: Response
  ) {

    const service =
      new DeletePropertyService();

    const result =
      await service.execute(
        req.user!.id,
        req.params.id as string
      );

    return res.json(result);
  }
}