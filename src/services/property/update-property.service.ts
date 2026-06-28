import { NotFoundError }
from "../../errors/not-found.error";

import {
  PropertyRepository
} from "../../repositories/property/property.repository";


export const updateProperty = (
  repository = PropertyRepository()
) => async (
  tenantId: string,
  propertyId: string,
  payload: any
) => {

  const category =
    await repository.findCategory(
      payload.categoryId,
      tenantId
    );

  if (!category) {
    throw new NotFoundError(
      "Category not found"
    );
  }

  const property =
    await repository.findById(
      propertyId,
      tenantId
    );

  if (!property) {
    throw new NotFoundError(
      "Property not found"
    );
  }

  return repository.update(
    propertyId,
    payload
  );
};