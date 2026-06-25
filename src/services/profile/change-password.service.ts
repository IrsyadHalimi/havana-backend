import { AppError } from "../../errors/app.error";

import { UserRepository } from "../../repositories/auth/user.repository";

import {
  comparePassword,
  hashPassword
} from "../../utils/password";

export class ChangePasswordService {

  constructor(
    private userRepo =
      new UserRepository()
  ) {}

  async execute(
    userId: string,
    oldPassword: string,
    newPassword: string
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

    if (!user.password) {
      throw new AppError(
        "Password not found",
        400
      );
    }

    const isMatch =
      await comparePassword(
        oldPassword,
        user.password
      );

    if (!isMatch) {
      throw new AppError(
        "Old password is incorrect",
        400
      );
    }

    const samePassword =
      await comparePassword(
        newPassword,
        user.password
      );

    if (samePassword) {
      throw new AppError(
        "New password must be different",
        400
      );
    }

    const hashedPassword =
      await hashPassword(
        newPassword
      );

    await this.userRepo.updatePassword(
      userId,
      hashedPassword
    );

    await this.userRepo.removeRefreshToken(
      userId
    );

    return {
      message:
        "Password updated successfully"
    };
  }
}