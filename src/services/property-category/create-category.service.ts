import { createConflictError }
from "../../errors/conflict.error";

import {
  createPropertyCategory,
  findPropertyCategoryByName
} from "../../repositories/property-category/property-category.repository";


export const createCategory = () => async (
  tenantId: string,
  name: string
) => {

  const exists =
    await findPropertyCategoryByName(
      tenantId,
      name
    );

  if (exists) {
    throw createConflictError(
      "Category already exists"
    );
  }

  return createPropertyCategory(
    tenantId,
    name
  );
};