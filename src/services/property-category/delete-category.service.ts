import { AppError }
from "../../errors/app.error";

import { NotFoundError }
from "../../errors/not-found.error";

import {
  PropertyCategoryRepository
} from "../../repositories/property-category/property-category.repository";


export const deleteCategory = (
  repository = PropertyCategoryRepository()
) => async (
  tenantId: string,
  categoryId: string
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

  const usage =
    await repository.findPropertyUsage(
      categoryId
    );

  if (usage > 0) {
    throw new AppError(
      "Category is used by property",
      400
    );
  }

  await repository.softDelete(
    categoryId
  );

  return {
    message:
      "Category deleted successfully"
  };
};