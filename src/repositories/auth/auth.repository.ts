import { prisma } from "../../config/prisma";

export const authRepository = () => ({
  findByEmail: (email: string) => {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  create: (data: any) => {
    return prisma.user.create({
      data,
    });
  },
});