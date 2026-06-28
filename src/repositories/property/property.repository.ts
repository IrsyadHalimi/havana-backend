import { prisma } from "../../config/prisma";
import { Prisma } from "@prisma/client";

interface FindAllParams {
  tenantId: string;
  search?: string;
  skip: number;
  take: number;
  sort?: string;
  order?: Prisma.SortOrder;
}

export const create = (
  data: Prisma.PropertyCreateInput
) => {
  return prisma.property.create({
    data
  });
};

export const findPropertyBySlug = (
  slug: string
) => {
  return prisma.property.findUnique({
    where: {
      slug
    }
  });
};

export const findPropertyCategory = (
  categoryId: string,
  tenantId: string
) => {
  return prisma.propertyCategory.findFirst({
    where: {
      id: categoryId,
      tenantId,
      deletedAt: null
    }
  });
};

export const findPropertyById = (
  id: string,
  tenantId: string
) => {
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
};

export const findAllProperties = ({
  tenantId,
  search,
  skip,
  take,
  sort = "createdAt",
  order = "desc"
}: FindAllParams) => {
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
      [sort]: order
    }
  });
};

export const countProperties = (
  tenantId: string,
  search?: string
) => {
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
};

export const updatePropertyRepository = (
  id: string,
  data: Prisma.PropertyUpdateInput
) => {
  return prisma.property.update({
    where: {
      id
    },
    data
  });
};

export const deletePropertyRepository = (
  id: string
) => {
  return prisma.property.update({
    where: {
      id
    },
    data: {
      deletedAt: new Date()
    }
  });
};

export const findPropertyBySlugExceptId = (
  slug: string,
  propertyId: string
) => {
  return prisma.property.findFirst({
    where: {
      slug,
      id: {
        not: propertyId
      }
    }
  });
};