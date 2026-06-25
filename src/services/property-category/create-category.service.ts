import { ConflictError }
from "../../errors/conflict.error";

import {
  PropertyCategoryRepository
}
from "../../repositories/poperty-category/property-category.repository";

export class CreateCategoryService {

  constructor(
    private repository =
      new PropertyCategoryRepository()
  ) {}

  async execute(
    tenantId: string,
    name: string
  ) {

    const exists =
      await this.repository.findByName(
        tenantId,
        name
      );

    if (exists) {
      throw new ConflictError(
        "Category already exists"
      );
    }

    return this.repository.create(
      tenantId,
      name
    );
  }
}