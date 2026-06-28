import {
  hashPassword
} from "../../utils/password";

import {
  AppError,
  createAppError
} from "../../errors/app.error";

import {
  passwordResetRepository
} from "../../repositories/auth/password-reset.repository";

import { updateUser } from "../../repositories/auth/user.repository";

export const resetPasswordService = (
  resetRepo = passwordResetRepository(),
) => ({

  execute: async (
    token: string,
    password: string
  ) => {

    const reset =
      await resetRepo.findValidToken(
        token
      );

    if (!reset) {
      throw createAppError(
        "Invalid token",
        400
      );
    }

    if (
      reset.expiredAt <
      new Date()
    ) {
      throw createAppError(
        "Token expired",
        400
      );
    }

    const hashed =
      await hashPassword(
        password
      );

    await updateUser(
      reset.userId,
      { password: hashed }
    );

    await resetRepo.markUsed(
      reset.id
    );

    return {
      message:
        "Password reset success"
    };
  }

});