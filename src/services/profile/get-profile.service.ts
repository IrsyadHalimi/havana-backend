import { NotFoundError }
from "../../errors/not-found.error";

import { profileRepository }
from "../../repositories/profile/profile.repository";


export const getProfileService = (
  profileRepo = profileRepository()
) => async (
  userId: string
) => {

  const user =
    await profileRepo.findById(userId);

  if (!user) {
    throw new NotFoundError(
      "User not found"
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