import { prisma } from "../../config/prisma";

import { Prisma } from "@prisma/client";

export const findUserById = (
  id: string
) => {
  return prisma.user.findUnique({
    where: {
      id
    }
  });
};

export const findUserByEmail = (
  email: string
) => {

  return prisma.user.findUnique({
    where: {
      email: email
    }
  });
};

export const createUser = (
  data: Prisma.UserCreateInput
) => {
  return prisma.user.create({
    data
  });
};

export const updateUser = (
  id: string,
  data: Prisma.UserUpdateInput
) => {
  return prisma.user.update({
    where: {
      id
    },
    data
  });
};

export const saveRefreshToken = (
  userId: string,
  refreshToken: string
) => {
  return prisma.user.update({
    where: {
      id: userId
    },
    data: {
      refreshToken
    }
  });
};

export const findUserByRefreshToken = (
  refreshToken: string
) => {
  return prisma.user.findFirst({
    where: {
      refreshToken,
      deletedAt: null
    }
  });
};

export const removeRefreshToken = (
  userId: string
) => {
  return prisma.user.update({
    where: {
      id: userId
    },
    data: {
      refreshToken: null
    }
  });
};

export const updateLastLogin = (
  userId: string
) => {
  return prisma.user.update({
    where: {
      id: userId
    },
    data: {
      lastLoginAt: new Date()
    }
  });
};