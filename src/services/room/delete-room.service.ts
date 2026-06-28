import { NotFoundError }
from "../../errors/not-found.error";

import {
  RoomRepository
} from "../../repositories/room/room.repository";


export const deleteRoom = (
  repository = RoomRepository()
) => async (
  tenantId: string,
  roomId: string
) => {

  const room =
    await repository.findById(
      roomId,
      tenantId
    );

  if (!room) {
    throw new NotFoundError(
      "Room not found"
    );
  }

  await repository.softDelete(
    roomId
  );

  return {
    message:
      "Room deleted successfully"
  };
};