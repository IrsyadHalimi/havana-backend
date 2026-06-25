import { AppError }
from "../../errors/app.error";

import { NotFoundError }
from "../../errors/not-found.error";

import {
  AvailabilityRepository
}
from "../../repositories/availability/availability.repository";

export class CreateAvailabilityService {

  constructor(
    private repository =
      new AvailabilityRepository()
  ) {}

  async execute(
    tenantId: string,
    roomId: string,
    payload: {
      date: string;
      availableRooms: number;
    }
  ) {

    const room =
      await this.repository.findRoom(
        roomId,
        tenantId
      );

    if (!room) {
      throw new NotFoundError(
        "Room not found"
      );
    }

    const existing =
      await this.repository
        .findByRoomAndDate(
          roomId,
          new Date(payload.date)
        );

    if (existing) {
      throw new AppError(
        "Availability already exists",
        400
      );
    }

    if (
      payload.availableRooms >
      room.totalRoom
    ) {

      throw new AppError(
        "Available room exceeds room stock",
        400
      );

    }

    return this.repository.create({
      roomId,
      date:
        new Date(payload.date),
      availableRooms:
        payload.availableRooms
    });
  }
}