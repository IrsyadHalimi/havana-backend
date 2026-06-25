import { addHours } from "date-fns";

import { AppError } from "../../errors/app.error";

import { generateToken } from "../../utils/token";

import { UserRepository } from "../../repositories/auth/user.repository";

import { EmailVerificationRepository } from "../../repositories/auth/email-verification.repository";

export class ChangeEmailService {

  constructor(
    private userRepo =
      new UserRepository(),

    private verificationRepo =
      new EmailVerificationRepository()
  ) {}

  async execute(
    userId: string,
    email: string
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

    if (user.email === email) {
      throw new AppError(
        "Email must be different",
        400
      );
    }

    const existingEmail =
      await this.userRepo.findByEmail(
        email
      );

    if (existingEmail) {
      throw new AppError(
        "Email already registered",
        409
      );
    }

    await this.userRepo.updateEmail(
      userId,
      email
    );

    await this.verificationRepo
      .deleteByUserId(userId);

    const token =
      generateToken();

    await this.verificationRepo.create({
      userId,
      token,
      expiredAt: addHours(
        new Date(),
        1
      )
    });

    /**
     * TODO
     * Send Email
     */

    return {
      message:
        "Verification email sent"
    };
  }
}