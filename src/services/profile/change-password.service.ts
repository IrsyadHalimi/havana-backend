import { AppError } from "../../errors/app.error";

import { userRepository } from "../../repositories/auth/user.repository";

import {
  comparePassword,
  hashPassword
} from "../../utils/password";


export const changePasswordService = (
  userRepo = userRepository()
) => async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {

  const user =
    await userRepo.findById(userId);

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

  await userRepo.updatePassword(
    userId,
    hashedPassword
  );

  await userRepo.removeRefreshToken(
    userId
  );

  return {
    message: "Password updated successfully"
  };
};