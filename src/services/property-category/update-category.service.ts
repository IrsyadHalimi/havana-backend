import { ConflictError }
from "../../errors/conflict.error";

import { NotFoundError }
from "../../errors/not-found.error";

import {
  PropertyCategoryRepository
}
from "../../repositories/property-category/property-category.repository";

export class UpdateCategoryService {

  constructor(
    private repository =
      new PropertyCategoryRepository()
  ) {}

  async execute(
    tenantId: string,
    categoryId: string,
    name: string
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

    const duplicate =
      await this.repository
        .findByName(
          tenantId,
          name
        );

    if (
      duplicate &&
      duplicate.id !== categoryId
    ) {
      throw new ConflictError(
        "Category already exists"
      );
    }

    return this.repository.update(
      categoryId,
      name
    );
  }
}