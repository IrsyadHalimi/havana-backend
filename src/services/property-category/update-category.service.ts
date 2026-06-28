import {createConflictError }
from "../../errors/conflict.error";

import { NotFoundError }
from "../../errors/not-found.error";

import {
  findPropertyCategoryByIdAndTenant,
  findPropertyCategoryByName,
  updatePropertyCategory
} from "../../repositories/property-category/property-category.repository";


export const updateCategory = () => async (
  tenantId: string,
  categoryId: string,
  name: string
) => {

  const category =
    await findPropertyCategoryByIdAndTenant(
      categoryId,
      tenantId
    );

  if (!category) {
    throw NotFoundError(
      "Category not found"
    );
  }

  const duplicate =
    await findPropertyCategoryByName(
      tenantId,
      name
    );

  if (
    duplicate &&
    duplicate.id !== categoryId
  ) {
    throw createConflictError(
      "Category already exists"
    );
  }

  return updatePropertyCategory(
    categoryId,
    name
  );
};