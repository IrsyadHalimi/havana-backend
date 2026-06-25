import { NotFoundError }
from "../../errors/not-found.error";

import {
  PropertyRepository
} from "../../repositories/property/property.repository";

export class UpdatePropertyService {

  constructor(
    private repository =
      new PropertyRepository()
  ) {}

  async execute(
    tenantId: string,
    propertyId: string,
    payload: any
  ) {

    const category =
      await this.repository.findCategory(
        payload.categoryId,
        tenantId
      );

    if (!category) {
      throw new NotFoundError(
        "Category not found"
      );
    }

    const property =
      await this.repository.findById(
        propertyId,
        tenantId
      );

    if (!property) {
      throw new NotFoundError(
        "Property not found"
      );
    }

    return this.repository.update(
      propertyId,
      payload
    );
  }
}