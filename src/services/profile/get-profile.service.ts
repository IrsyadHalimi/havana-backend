import { createAppError } from "../../errors/app.error";
import { NotFoundError }
from "../../errors/not-found.error";
import { findUserById } from "../../repositories/auth/user.repository";

import { profileRepository }
from "../../repositories/profile/profile.repository";


export const getProfileService = () => async (
  userId: string
) => {

  const user =
    await findUserById(userId);

  if (!user) {
    throw createAppError(
      "User not found",
      404
    );
  }

  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar,
    role: user.role,
    isVerified: user.isVerified
  };
};