import { ConflictError }
from "../../errors/conflict.error";

import { NotFoundError }
from "../../errors/not-found.error";

import {
  PropertyCategoryRepository
} from "../../repositories/property-category/property-category.repository";


export const updateCategory = (
  repository = PropertyCategoryRepository()
) => async (
  tenantId: string,
  categoryId: string,
  name: string
) => {

  const category =
    await repository.findByIdAndTenant(
      categoryId,
      tenantId
    );

  if (!category) {
    throw new NotFoundError(
      "Category not found"
    );
  }

  const duplicate =
    await repository.findByName(
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

  return repository.update(
    categoryId,
    name
  );
};