import { addHours } from "date-fns";

import { AppError } from "../../errors/app.error";

import { generateToken } from "../../utils/token";

import { UserRepository } from "../../repositories/auth/user.repository";

import { EmailVerificationRepository } from "../../repositories/auth/email-verification.repository";

export class ReverifyEmailService {

  constructor(
    private userRepo =
      new UserRepository(),

    private verificationRepo =
      new EmailVerificationRepository()
  ) {}

  async execute(
    userId: string
  ) {

    const user =
      await this.userRepo.findById(
        userId
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
      .deleteByUserId(
        userId
      );

    const token =
      generateToken();

    await this.verificationRepo
      .create({
        userId,
        token,
        expiredAt: addHours(
          new Date(),
          1
        )
      });

    /**
     * TODO:
     * Send Verification Email
     */

    return {
      message:
        "Verification email sent"
    };
  }
}