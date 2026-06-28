import { Prisma } from "@prisma/client";

import { prisma } from "../../config/prisma";

export const createRoomAvailability = (
  data: {
    roomId: string;
    date: Date;
    availableRooms: number;
  }
) => {
  return prisma.roomAvailability.create({
    data
  });
};


export const findPropertyRoomById = (
  roomId: string,
  tenantId: string
) => {
  return prisma.propertyRoom.findFirst({
    where: {
      id: roomId,
      deletedAt: null,

      property: {
        tenantId,
        deletedAt: null
      }
    }
  });
};

export const findRoomAvailabilityByDate = (
  roomId: string,
  date: Date
) => {
  return prisma.roomAvailability.findFirst({
    where: {
      roomId,
      date
    }
  });
};

export const findAllRoomAvailabilities = (
  roomId: string,
  startDate: Date,
  endDate: Date
) => {
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
};

export const findRoomAvailabilityById = (
  availabilityId: string,
  tenantId: string
) => {
  return prisma.roomAvailability.findFirst({
    where: {
      id: availabilityId,

      room: {
        property: {
          tenantId,
          deletedAt: null
        }
      }
    },

    include: {
      room: {
        include: {
          property: true
        }
      }
    }
  });
};

export const updateRoomAvailability = (
  availabilityId: string,
  data: Prisma.RoomAvailabilityUpdateInput
) => {
  return prisma.roomAvailability.update({
    where: {
      id: availabilityId
    },
    data
  });
};

export const findRoomAvailabilitiesBetweenDates = (
  roomId: string,
  checkIn: Date,
  checkOut: Date
) => {
  return prisma.roomAvailability.findMany({
    where: {
      roomId,

      date: {
        gte: checkIn,
        lt: checkOut
      }
    },

    orderBy: {
      date: "asc"
    }
  });
};