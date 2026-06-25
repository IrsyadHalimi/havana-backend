import { NotFoundError }
from "../../errors/not-found.error";

import {
  RoomRepository
} from "../../repositories/room/room.repository";

export class CreateRoomService {

  constructor(
    private repository =
      new RoomRepository()
  ) {}

  async execute(
    tenantId: string,
    propertyId: string,
    payload: any
  ) {

    const property =
      await this.repository
        .findProperty(
          propertyId,
          tenantId
        );

    if (!property) {
      throw new NotFoundError(
        "Property not found"
      );
    }

    return this.repository.create({
      propertyId,
      ...payload
    });
  }
}