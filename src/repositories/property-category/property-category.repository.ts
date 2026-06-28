import { Prisma } from "@prisma/client";

import { prisma } from "../../config/prisma";

import { getSorting } from "../../utils/query/sorting";

interface FindAllPropertyCategoriesParams {
  tenantId: string;
  search?: string;
  sort?: string;
  order?: Prisma.SortOrder;
  skip: number;
  take: number;
}

export const createPropertyCategory = (
  tenantId: string,
  name: string
) => {
  return prisma.propertyCategory.create({
    data: {
      tenantId,
      name
    }
  });
};

export const findPropertyCategoryById = (
  id: string
) => {
  return prisma.propertyCategory.findFirst({
    where: {
      id,
      deletedAt: null
    }
  });
};

export const findPropertyCategoryByName = (
  tenantId: string,
  name: string
) => {
  return prisma.propertyCategory.findFirst({
    where: {
      tenantId,
      name,
      deletedAt: null
    }
  });
};

export const findAllPropertyCategories = ({
  tenantId,
  search,
  sort,
  order,
  skip,
  take
}: FindAllPropertyCategoriesParams) => {
  return prisma.propertyCategory.findMany({
    where: {
      tenantId,
      deletedAt: null,

      ...(search && {
        name: {
          contains: search,
          mode: "insensitive"
        }
      })
    },

    skip,
    take,

    orderBy: getSorting(
      sort,
      order
    )
  });
};

export const countPropertyCategories = (
  tenantId: string,
  search?: string
) => {
  return prisma.propertyCategory.count({
    where: {
      tenantId,
      deletedAt: null,

      ...(search && {
        name: {
          contains: search,
          mode: "insensitive"
        }
      })
    }
  });
};

export const updatePropertyCategory = (
  id: string,
  name: string
) => {
  return prisma.propertyCategory.update({
    where: {
      id
    },
    data: {
      name
    }
  });
};

export const deletePropertyCategory = (
  id: string
) => {
  return prisma.propertyCategory.update({
    where: {
      id
    },
    data: {
      deletedAt: new Date()
    }
  });
};

export const findPropertyCategoryByIdAndTenant = (
  id: string,
  tenantId: string
) => {
  return prisma.propertyCategory.findFirst({
    where: {
      id,
      tenantId,
      deletedAt: null
    }
  });
};

export const countPropertyByCategory = (
  categoryId: string
) => {
  return prisma.property.count({
    where: {
      categoryId,
      deletedAt: null
    }
  });
};