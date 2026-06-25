import { NotFoundError }
from "../../errors/not-found.error";

import {
  PropertyRepository
} from "../../repositories/property/property.repository";

export class DetailPropertyService {

  constructor(
    private repository =
      new PropertyRepository()
  ) {}

  async execute(
    tenantId: string,
    propertyId: string
  ) {

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

    return property;
  }
}