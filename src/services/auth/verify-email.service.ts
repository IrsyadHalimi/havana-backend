import { hashPassword }
from "../../utils/password";

import { NotFoundError }
from "../../errors/not-found.error";

import { AppError }
from "../../errors/app.error";

import { UserRepository }
from "../../repositories/auth/user.repository";

import { EmailVerificationRepository }
from "../../repositories/auth/email-verification.repository";

export class VerifyEmailService {

  constructor(
    private userRepo =
      new UserRepository(),

    private verificationRepo =
      new EmailVerificationRepository()
  ) {}

  async execute(
    token: string,
    password: string
  ) {

    const verification =
      await this.verificationRepo
        .findValidToken(token);

    if (!verification) {
      throw new NotFoundError(
        "Invalid token"
      );
    }

    if (
      verification.expiredAt <
      new Date()
    ) {
      throw new AppError(
        "Token expired",
        400
      );
    }

    const hashedPassword =
      await hashPassword(password);

    await this.userRepo.verifyUser(
      verification.userId,
      hashedPassword
    );

    await this.verificationRepo.markUsed(
      verification.id
    );

    return {
      message:
        "Email verified successfully"
    };
  }
}