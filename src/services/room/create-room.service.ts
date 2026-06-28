import { NotFoundError }
from "../../errors/not-found.error";

import {
  createPropertyRoom,
  findPropertyById,
} from "../../repositories/room/room.repository";


export const createRoom = () => async (
  tenantId: string,
  propertyId: string,
  payload: any
) => {

  const property =
    await findPropertyById(
      propertyId,
      tenantId
    );

  if (!property) {
    throw NotFoundError(
      "Property not found"
    );
  }

  return createPropertyRoom({
    propertyId,
    ...payload
  });
};