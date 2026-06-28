import { NotFoundError }
from "../../errors/not-found.error";

import {
  createPropertyRoom,
  findPropertyRoomById,
} from "../../repositories/room/room.repository";


export const detailRoom = () => async (
  tenantId: string,
  roomId: string
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

  return room;
};