import { addHours } from "date-fns";

import { AppError }
from "../../errors/app.error";

import { generateToken }
from "../../utils/token";

import { UserRepository }
from "../../repositories/auth/user.repository";

import { PasswordResetRepository }
from "../../repositories/auth/password-reset.repository";

export class ForgotPasswordService {

  constructor(
    private userRepo =
      new UserRepository(),

    private resetRepo =
      new PasswordResetRepository()
  ) {}

  async execute(email: string) {

    const user =
      await this.userRepo.findByEmail(
        email
      );

    if (!user) {
      return {
        message:
          "If email exists, reset link sent"
      };
    }

    await this.resetRepo
      .deleteUnusedByUserId(
        user.id
      );

    const token =
      generateToken();

    await this.resetRepo.create({
      userId: user.id,
      token,
      expiredAt: addHours(
        new Date(),
        1
      )
    });

    return {
      message:
      "If email exists, reset link sent"
    };
  }
}