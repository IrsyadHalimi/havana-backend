import { AppError }
from "../../errors/app.error";

import {
  PropertyRepository
} from "../../repositories/property/property.repository";

import {
  generateSlug
} from "../../utils/slug";


export const createProperty = (
  repository = PropertyRepository()
) => async (
  tenantId: string,
  payload: any
) => {

  const category =
    await repository.findCategory(
      payload.categoryId,
      tenantId
    );

  if (!category) {
    throw new AppError(
      "Category not found",
      404
    );
  }

  let slug =
    generateSlug(
      payload.name
    );

  let counter = 1;

  while (
    await repository.findBySlug(slug)
  ) {
    slug =
      `${generateSlug(payload.name)}-${counter}`;

    counter++;
  }

  return repository.create({
    ...payload,
    tenantId,
    slug
  });
};