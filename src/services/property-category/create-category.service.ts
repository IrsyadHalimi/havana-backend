import { ConflictError }
from "../../errors/conflict.error";

import {
  PropertyCategoryRepository
} from "../../repositories/property-category/property-category.repository";


export const createCategory = (
  repository = PropertyCategoryRepository()
) => async (
  tenantId: string,
  name: string
) => {

  const exists =
    await repository.findByName(
      tenantId,
      name
    );

  if (exists) {
    throw new ConflictError(
      "Category already exists"
    );
  }

  return repository.create(
    tenantId,
    name
  );
};