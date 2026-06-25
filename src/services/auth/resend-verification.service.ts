import { addHours } from "date-fns";

import { AppError }
from "../../errors/app.error";

import { generateToken }
from "../../utils/token";

import { UserRepository }
from "../../repositories/auth/user.repository";

import { EmailVerificationRepository }
from "../../repositories/auth/email-verification.repository";

export class ResendVerificationService {

  constructor(
    private userRepo =
      new UserRepository(),

    private verificationRepo =
      new EmailVerificationRepository()
  ) {}

  async execute(email: string) {

    const user =
      await this.userRepo.findByEmail(
        email
      );

    if (!user) {
      throw new AppError(
        "User not found",
        404
      );
    }

    if (user.isVerified) {
      throw new AppError(
        "Email already verified",
        400
      );
    }

    await this.verificationRepo
      .deleteUnusedByUserId(
        user.id
      );

    const token =
      generateToken();

    await this.verificationRepo.create({
      userId: user.id,
      token,
      expiredAt: addHours(
        new Date(),
        1
      )
    });

    return {
      message:
        "Verification email sent"
    };
  }
}