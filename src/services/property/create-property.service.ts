import { AppError }
from "../../errors/app.error";

import {
  PropertyRepository
} from "../../repositories/property/property.repository";

import {
  generateSlug
} from "../../utils/slug";

export class CreatePropertyService {

  constructor(
    private repository =
      new PropertyRepository()
  ) {}

  async execute(
    tenantId: string,
    payload: any
  ) {

    const category =
      await this.repository
        .findCategory(
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
      await this.repository
        .findBySlug(slug)
    ) {
      slug =
        `${generateSlug(payload.name)}-${counter}`;

      counter++;
    }

    return this.repository.create({
      ...payload,
      tenantId,
      slug
    });
  }
}