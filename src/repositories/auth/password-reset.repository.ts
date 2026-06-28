import { prisma } from "../../config/prisma";

export const passwordResetRepository = () => ({
  create: (data: any) => {
    return prisma.passwordReset.create({
      data,
    });
  },

  findValidToken: (token: string) => {
    return prisma.passwordReset.findFirst({
      where: {
        token,
        usedAt: null,
      },
      include: {
        user: true,
      },
    });
  },

  markUsed: (id: number) => {
    return prisma.passwordReset.update({
      where: {
        id,
      },
      data: {
        usedAt: new Date(),
      },
    });
  },

  deleteUnusedByUserId: (userId: string) => {
    return prisma.passwordReset.deleteMany({
      where: {
        userId,
        usedAt: null,
      },
    });
  },
});