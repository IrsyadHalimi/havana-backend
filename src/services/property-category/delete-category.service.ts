import { AppError }
from "../../errors/app.error";

import { NotFoundError }
from "../../errors/not-found.error";

import {
  PropertyCategoryRepository
}
from "../../repositories/property-category/property-category.repository";

export class DeleteCategoryService {

  constructor(
    private repository =
      new PropertyCategoryRepository()
  ) {}

  async execute(
    tenantId: string,
    categoryId: string
  ) {

    const category =
      await this.repository
        .findByIdAndTenant(
          categoryId,
          tenantId
        );

    if (!category) {
      throw new NotFoundError(
        "Category not found"
      );
    }

    const usage =
      await this.repository
        .findPropertyUsage(
          categoryId
        );

    if (usage > 0) {
      throw new AppError(
        "Category is used by property",
        400
      );
    }

    await this.repository
      .softDelete(
        categoryId
      );

    return {
      message:
        "Category deleted successfully"
    };
  }
}