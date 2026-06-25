import {
  Request,
  Response
} from "express";

import {
  DetailCategoryService
} from "../../services/property-category/detail-category.service";

export class DetailCategoryController {

  async handle(
    req: Request,
    res: Response
  ) {
    const service =
      new DetailCategoryService();

    const result =
      await service.execute(
        req.user!.id,
        req.params.id as string
      );

    return res.json(result);
  }
}