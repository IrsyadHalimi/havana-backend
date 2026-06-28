import { prisma }
from "../../config/prisma";

export const PropertyRepository = () => ({

  create(data: any) {
    return prisma.property.create({
      data
    });
  },

  findBySlug(slug: string) {
    return prisma.property.findUnique({
      where: {
        slug
      }
    });
  },

  findCategory(
    categoryId: string,
    tenantId: string
  ) {
    return prisma.propertyCategory.findFirst({
      where: {
        id: categoryId,
        tenantId,
        deletedAt: null
      }
    });
  },

  findById(
    id: string,
    tenantId: string
  ) {
    return prisma.property.findFirst({
      where: {
        id,
        tenantId,
        deletedAt: null
      },
      include: {
        category: true
      }
    });
  },

  async findAll({
    tenantId,
    search,
    skip,
    take,
    sort,
    order
  }: {
    tenantId: string;
    search?: string;
    skip: number;
    take: number;
    sort?: string;
    order?: "asc" | "desc";
  }) {

    return prisma.property.findMany({
      where: {
        tenantId,
        deletedAt: null,

        ...(search && {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              city: {
                contains: search,
                mode: "insensitive"
              }
            }
          ]
        })
      },

      include: {
        category: true
      },

      skip,
      take,

      orderBy: {
        [sort || "createdAt"]:
          order || "desc"
      }
    });
  },

  count(
    tenantId: string,
    search?: string
  ) {
    return prisma.property.count({
      where: {
        tenantId,
        deletedAt: null,

        ...(search && {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              city: {
                contains: search,
                mode: "insensitive"
              }
            }
          ]
        })
      }
    });
  },

  update(
    id: string,
    data: any
  ) {
    return prisma.property.update({
      where: {
        id
      },
      data
    });
  },

  softDelete(id: string) {
    return prisma.property.update({
      where: {
        id
      },
      data: {
        deletedAt: new Date()
      }
    });
  },

  findBySlugExceptId(
    slug: string,
    propertyId: string
  ) {
    return prisma.property.findFirst({
      where: {
        slug,
        id: {
          not: propertyId
        }
      }
    });
  },
});