import { NotFoundError }
from "../../errors/not-found.error";

import {
  findPropertyCategoryByIdAndTenant
} from "../../repositories/property-category/property-category.repository";


export const detailCategory = () => async (
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

  return category;
};