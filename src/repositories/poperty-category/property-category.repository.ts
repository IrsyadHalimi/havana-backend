import { prisma } from "../../config/prisma";

interface FindAllParams {
  tenantId: string;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
  skip: number;
  take: number;
}

export class PropertyCategoryRepository {

  create(
    tenantId: string,
    name: string
  ) {
    return prisma.propertyCategory.create({
      data: {
        tenantId,
        name
      }
    });
  }

  findById(id: string) {
    return prisma.propertyCategory.findFirst({
      where: {
        id,
        deletedAt: null
      }
    });
  }

  findByName(
    tenantId: string,
    name: string
  ) {
    return prisma.propertyCategory.findFirst({
      where: {
        tenantId,
        name,
        deletedAt: null
      }
    });
  }

  findAll(params: FindAllParams) {

    const {
      tenantId,
      search,
      sort,
      order,
      skip,
      take
    } = params;

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
      orderBy: {
        [sort || "createdAt"]:
          order || "desc"
      }
    });
  }

  count(
    tenantId: string,
    search?: string
  ) {
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
  }

  update(
    id: string,
    name: string
  ) {
    return prisma.propertyCategory.update({
      where: {
        id
      },
      data: {
        name
      }
    });
  }

  softDelete(id: string) {
    return prisma.propertyCategory.update({
      where: {
        id
      },
      data: {
        deletedAt: new Date()
      }
    });
  }
}