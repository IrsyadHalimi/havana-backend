import {
  hashPassword
} from "../../utils/password";

import {
  AppError
} from "../../errors/app.error";

import {
  passwordResetRepository
} from "../../repositories/auth/password-reset.repository";

import {
  userRepository
} from "../../repositories/auth/user.repository";


export const resetPasswordService = (
  resetRepo = passwordResetRepository(),
  userRepo = userRepository()
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
      throw new AppError(
        "Invalid token",
        400
      );
    }

    if (
      reset.expiredAt <
      new Date()
    ) {
      throw new AppError(
        "Token expired",
        400
      );
    }

    const hashed =
      await hashPassword(
        password
      );

    await userRepo.updatePassword(
      reset.userId,
      hashed
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