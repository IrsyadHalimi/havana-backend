import {
  Request,
  Response
} from "express";

import {
  CreateCategoryService
} from "../../services/property-category/create-category.service";

export class CreateCategoryController {

  async handle(
    req: Request,
    res: Response
  ) {

    const service =
      new CreateCategoryService();

    const result =
      await service.execute(
        req.user!.id,
        req.body.name
      );

    return res.status(201)
      .json(result);
  }
}