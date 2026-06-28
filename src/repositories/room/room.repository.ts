import { Prisma } from "@prisma/client";

import { prisma } from "../../config/prisma";

interface FindAllPropertyRoomsParams {
  propertyId: string;
  tenantId: string;
  skip: number;
  take: number;
  search?: string;
}

export const createPropertyRoom = (
  data: Prisma.PropertyRoomCreateInput
) => {
  return prisma.propertyRoom.create({
    data
  });
};

export const findPropertyById = (
  propertyId: string,
  tenantId: string
) => {
  return prisma.property.findFirst({
    where: {
      id: propertyId,
      tenantId,
      deletedAt: null
    }
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
    },

    include: {
      property: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });
};

export const findAllPropertyRooms = ({
  propertyId,
  tenantId,
  skip,
  take,
  search
}: FindAllPropertyRoomsParams) => {
  return prisma.propertyRoom.findMany({
    where: {
      propertyId,
      deletedAt: null,

      property: {
        tenantId,
        deletedAt: null
      },

      ...(search && {
        name: {
          contains: search,
          mode: "insensitive"
        }
      })
    },

    skip,
    take,

    orderBy: {
      createdAt: "desc"
    }
  });
};

export const countPropertyRooms = (
  propertyId: string,
  tenantId: string,
  search?: string
) => {
  return prisma.propertyRoom.count({
    where: {
      propertyId,
      deletedAt: null,

      property: {
        tenantId,
        deletedAt: null
      },

      ...(search && {
        name: {
          contains: search,
          mode: "insensitive"
        }
      })
    }
  });
};

export const updatePropertyRoom = (
  roomId: string,
  data: Prisma.PropertyRoomUpdateInput
) => {
  return prisma.propertyRoom.update({
    where: {
      id: roomId
    },
    data
  });
};

export const deletePropertyRoom = (
  roomId: string
) => {
  return prisma.propertyRoom.update({
    where: {
      id: roomId
    },
    data: {
      deletedAt: new Date()
    }
  });
};