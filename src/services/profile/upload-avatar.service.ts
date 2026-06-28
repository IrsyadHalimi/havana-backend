import { profileRepository }
from "../../repositories/profile/profile.repository";


export const uploadAvatar = (
  profileRepo = profileRepository()
) => async (
  userId: string,
  avatar: string
) => {

  await profileRepo.updateAvatar(
    userId,
    avatar
  );

  return {
    message: "Avatar uploaded"
  };
};