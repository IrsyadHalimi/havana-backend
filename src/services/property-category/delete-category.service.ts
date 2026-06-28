import { AppError, createAppError }
from "../../errors/app.error";

import { NotFoundError }
from "../../errors/not-found.error";

import {
  findPropertyCategoryByIdAndTenant,
  countPropertyByCategory,
  deletePropertyCategory
} from "../../repositories/property-category/property-category.repository";


export const deleteCategory = () => async (
  tenantId: string,
  categoryId: string
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

  const usage =
    await countPropertyByCategory(
      categoryId
    );

  if (usage > 0) {
    throw createAppError(
      "Category is used by property",
      400
    );
  }

  await deletePropertyCategory(
    categoryId
  );

  return {
    message:
      "Category deleted successfully"
  };
};