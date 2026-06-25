import {
  Request,
  Response
} from "express";

import {
  ListCategoryService
} from "../../services/property-category/list-category.service";

export class ListCategoryController {

  async handle(
    req: Request,
    res: Response
  ) {

    const service =
      new ListCategoryService();

    const result =
      await service.execute(
        req.user!.id,
        req.query
      );

    return res.json(result);
  }
}