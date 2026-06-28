import { NotFoundError }
from "../../errors/not-found.error";

import {
  RoomRepository
} from "../../repositories/room/room.repository";


export const createRoom = (
  repository = RoomRepository()
) => async (
  tenantId: string,
  propertyId: string,
  payload: any
) => {

  const property =
    await repository.findProperty(
      propertyId,
      tenantId
    );

  if (!property) {
    throw new NotFoundError(
      "Property not found"
    );
  }

  return repository.create({
    propertyId,
    ...payload
  });
};