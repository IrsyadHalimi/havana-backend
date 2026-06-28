import { createAppError }
from "../../errors/app.error";

import {
  create,
  findPropertyBySlug,
  findPropertyCategory,
} from "../../repositories/property/property.repository";

import {
  generateSlug
} from "../../utils/slug";


export const createProperty = () => async (
  tenantId: string,
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

  let slug =
    generateSlug(
      payload.name
    );

  let counter = 1;

  while (
    await findPropertyBySlug(slug)
  ) {
    slug =
      `${generateSlug(payload.name)}-${counter}`;

    counter++;
  }

  return create({
    ...payload,
    tenantId,
    slug
  });
};