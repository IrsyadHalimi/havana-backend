import { createAppError } from "../../errors/app.error";
import { NotFoundError }
from "../../errors/not-found.error";

import {
  create,
  findPropertyById,
  findPropertyBySlug,
  findPropertyCategory,
  deletePropertyRepository,
} from "../../repositories/property/property.repository";


export const detailProperty = () => async (
  tenantId: string,
  propertyId: string
) => {

  const property =
    await findPropertyById(
      propertyId,
      tenantId
    );

  if (!property) {
    throw createAppError(
      "Property not found",
      404
    );
  }

  return property;
};