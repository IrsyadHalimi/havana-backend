import { prisma }
from "../../config/prisma";

export class AvailabilityRepository {

  create(data: {
    roomId: string;
    date: Date;
    availableRooms: number;
  }) {

    return prisma.roomAvailability.create({
      data
    });

  }

  findRoom(
    roomId: string,
    tenantId: string
  ) {

    return prisma.propertyRoom.findFirst({
      where: {
        id: roomId,
        deletedAt: null,

        property: {
          tenantId
        }
      }
    });

  }

  findByRoomAndDate(
    roomId: string,
    date: Date
  ) {

    return prisma.roomAvailability.findFirst({
      where: {
        roomId,
        date
      }
    });

  }

  findAllByRoom(
    roomId: string,
    startDate: Date,
    endDate: Date
  ) {

    return prisma.roomAvailability.findMany({
      where: {
        roomId,

        date: {
          gte: startDate,
          lte: endDate
        }
      },

      orderBy: {
        date: "asc"
      }
    });

  }

  findById(
    availabilityId: string,
    tenantId: string
  ) {

    return prisma.roomAvailability.findFirst({
      where: {
        id: availabilityId,

        room: {
          property: {
            tenantId
          }
        }
      },

      include: {
        room: true
      }
    });

  }
}