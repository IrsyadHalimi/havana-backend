import { prisma }
from "../../config/prisma";

export class PropertyRepository {

  create(data: any) {
    return prisma.property.create({
      data
    });
  }

  findBySlug(slug: string) {
    return prisma.property.findUnique({
      where: {
        slug
      }
    });
  }

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
  }
}