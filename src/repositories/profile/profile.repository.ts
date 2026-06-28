import { prisma } from "../../config/prisma";

export const profileRepository = () =>({

  findById(id: string) {
    return prisma.user.findUnique({
      where: { id }
    });
  },

  updateProfile(
    id: string,
    data: {
      fullName: string;
      phone?: string;
    }
  ) {
    return prisma.user.update({
      where: { id },
      data
    });
  },

  updateAvatar(
    userId: string,
    avatar: string
  ) {
    return prisma.user.update({
      where: {
        id: userId
      },
      data: {
        avatar
      }
    });
  }
});