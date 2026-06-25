import { NotFoundError }
from "../../errors/not-found.error";

import {
  PropertyCategoryRepository
}
from "../../repositories/property-category/property-category.repository";

export class DetailCategoryService {

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

    return category;
  }
}