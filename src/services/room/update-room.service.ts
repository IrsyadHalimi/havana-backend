import { NotFoundError }
from "../../errors/not-found.error";

import {
  updatePropertyRoom,
  findPropertyRoomById
} from "../../repositories/room/room.repository";


export const updateRoom = () => async (
  tenantId: string,
  roomId: string,
  payload: any
) => {

  const room =
    await findPropertyRoomById(
      roomId,
      tenantId
    );

  if (!room) {
    throw NotFoundError(
      "Room not found"
    );
  }

  return updatePropertyRoom(
    roomId,
    payload
  );
};