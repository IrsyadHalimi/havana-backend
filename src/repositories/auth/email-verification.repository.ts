import { prisma }
from "../../config/prisma";

export class EmailVerificationRepository {
  create(data:any) {
    return prisma.emailVerification.create({
      data
    });
  }

  findValidToken(token: string) {
    return prisma.emailVerification.findFirst({
        where: {
        token,
        usedAt: null
        },
        include: {
        user: true
        }
    });
  }

  markUsed(id: number) {
    return prisma.emailVerification.update({
        where: { id },
        data: {
        usedAt: new Date()
        }
    });
  }

  deleteUnusedByUserId(
    userId: string
  ) {
    return prisma.emailVerification.deleteMany({
      where: {
        userId,
        usedAt: null
      }
    });
  }
}