import { NotFoundError }
from "../../errors/not-found.error";

import {
  PropertyCategoryRepository
} from "../../repositories/property-category/property-category.repository";


export const detailCategory = (
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

  return category;
};