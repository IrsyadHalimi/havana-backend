import { NotFoundError }
from "../../errors/not-found.error";

import {
  deletePropertyRoom,
  findPropertyRoomById
} from "../../repositories/room/room.repository";


export const deleteRoom = () => async (
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

  await deletePropertyRoom(
    roomId
  );

  return {
    message:
      "Room deleted successfully"
  };
};