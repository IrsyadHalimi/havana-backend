import { hashPassword }
from "../../utils/password";

import { AppError }
from "../../errors/app.error";

import { PasswordResetRepository }
from "../../repositories/auth/password-reset.repository";

import { UserRepository }
from "../../repositories/auth/user.repository";

export class ResetPasswordService {

  constructor(
    private resetRepo =
      new PasswordResetRepository(),

    private userRepo =
      new UserRepository()
  ) {}

  async execute(
    token: string,
    password: string
  ) {

    const reset =
      await this.resetRepo
        .findValidToken(token);

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

    await this.userRepo
      .updatePassword(
        reset.userId,
        hashed
      );

    await this.resetRepo
      .markUsed(reset.id);

    return {
      message:
      "Password reset success"
    };
  }
}