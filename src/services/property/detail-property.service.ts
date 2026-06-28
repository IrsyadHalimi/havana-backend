import { NotFoundError }
from "../../errors/not-found.error";

import {
  PropertyRepository
} from "../../repositories/property/property.repository";


export const detailProperty = (
  repository = PropertyRepository()
) => async (
  tenantId: string,
  propertyId: string
) => {

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

  return property;
};