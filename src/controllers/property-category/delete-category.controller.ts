import {
  Request,
  Response
} from "express";

import {
  DeleteCategoryService
} from "../../services/property-category/delete-category.service";

export class DeleteCategoryController {

  async handle(
    req: Request,
    res: Response
  ) {

    const service =
      new DeleteCategoryService();

    const result =
      await service.execute(
        req.user!.id,
        req.params.id as string
      );

    return res.json(result);
  }
}