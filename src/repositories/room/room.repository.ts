import { prisma } from "../../config/prisma";

export class RoomRepository {

  create(data: {
    propertyId: string;
    name: string;
    description?: string;
    basePrice: number;
    capacity: number;
    totalRoom: number;
  }) {
    return prisma.propertyRoom.create({
      data
    });
  }

  findProperty(
    propertyId: string,
    tenantId: string
  ) {
    return prisma.property.findFirst({
      where: {
        id: propertyId,
        tenantId,
        deletedAt: null
      }
    });
  }

  findById(
    roomId: string,
    tenantId: string
  ) {
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
  }

  findAllByProperty(
    propertyId: string,
    tenantId: string,
    skip: number,
    take: number,
    search?: string
  ) {

    return prisma.propertyRoom.findMany({
      where: {
        propertyId,
        deletedAt: null,

        property: {
          tenantId
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
  }

  countByProperty(
    propertyId: string,
    tenantId: string,
    search?: string
  ) {

    return prisma.propertyRoom.count({
      where: {
        propertyId,
        deletedAt: null,

        property: {
          tenantId
        },

        ...(search && {
          name: {
            contains: search,
            mode: "insensitive"
          }
        })
      }
    });
  }

  update(
    roomId: string,
    data: any
  ) {
    return prisma.propertyRoom.update({
      where: {
        id: roomId
      },
      data
    });
  }

  softDelete(
    roomId: string
  ) {
    return prisma.propertyRoom.update({
      where: {
        id: roomId
      },
      data: {
        deletedAt: new Date()
      }
    });
  }
  
}