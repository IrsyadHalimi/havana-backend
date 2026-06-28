import { createAppError } from "../../errors/app.error";
import {
  findPropertyById,
  findPropertyCategory,
  updatePropertyRepository
} from "../../repositories/property/property.repository";


export const updateProperty = () => async (
  tenantId: string,
  propertyId: string,
  payload: any
) => {

  const category =
    await findPropertyCategory(
      payload.categoryId,
      tenantId
    );

  if (!category) {
    throw createAppError(
      "Category not found",
      404
    );
  }

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

  return updatePropertyRepository(
    propertyId,
    payload
  );
};