import { prisma }
from "../../config/prisma";

export class UserRepository {

  create(data:any) {
    return prisma.user.create({
      data
    });
  }

  findByEmail(email:string) {
    return prisma.user.findUnique({
      where:{ email }
    });
  }

  findById(id:string) {
    return prisma.user.findUnique({
      where:{ id }
    });
  }

  verifyUser(
    userId: string,
    hashedPassword: string
  ) {
    return prisma.user.update({
      where: {
        id: userId
      },
      data: {
        password: hashedPassword,
        isVerified: true,
        emailVerifiedAt: new Date()
      }
    });
  }

  updatePassword(
    userId: string,
    password: string
  ) {
    return prisma.user.update({
      where: {
        id: userId
      },
      data: {
        password
      }
    });
  }

  updateRefreshToken(
    userId: string,
    refreshToken: string
  ) {
    return prisma.user.update({
      where: {
        id: userId
      },
      data: {
        refreshToken,
        lastLoginAt:
          new Date()
      }
    });
  }

  findByRefreshToken(
    refreshToken: string
  ) {
    return prisma.user.findFirst({
      where: {
        refreshToken
      }
    });
  }

  removeRefreshToken(
    userId: string
  ) {
    return prisma.user.update({
      where: {
        id: userId
      },
      data: {
        refreshToken: null
      }
    });
  }
}