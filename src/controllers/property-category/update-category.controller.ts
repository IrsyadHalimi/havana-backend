import {
  Request,
  Response
} from "express";

import {
  UpdateCategoryService
} from "../../services/property-category/update-category.service";

export class UpdateCategoryController {

  async handle(
    req: Request,
    res: Response
  ) {

    const service =
      new UpdateCategoryService();

    const result =
      await service.execute(
        req.user!.id,
        req.params.id as string,
        req.body.name
      );

    return res.json(result);
  }
}