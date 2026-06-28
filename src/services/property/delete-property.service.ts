import { NotFoundError }
from "../../errors/not-found.error";

import {
  PropertyRepository
} from "../../repositories/property/property.repository";


export const deleteProperty = (
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

  await repository.softDelete(
    propertyId
  );

  return {
    message:
      "Property deleted successfully"
  };
};