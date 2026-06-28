import { AppError, createAppError } from "../../errors/app.error";

import {
  comparePassword,
  hashPassword
} from "../../utils/password";

import { findUserById, updateUser } from "../../repositories/auth/user.repository";

export const changePasswordService = () => async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {

  const user =
    await findUserById(userId);

  if (!user) {
    throw createAppError(
      "User not found",
      404
    );
  }

  if (!user.password) {
    throw createAppError(
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
    throw createAppError(
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
    throw createAppError(
      "New password must be different",
      400
    );
  }

  const hashedPassword =
    await hashPassword(
      newPassword
    );

  await updateUser(
    userId,
    { password: hashedPassword }
  );

  await updateUser(
    userId,
    { refreshToken: null }
  );

  return {
    message: "Password updated successfully"
  };
};