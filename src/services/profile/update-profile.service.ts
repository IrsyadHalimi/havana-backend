import { profileRepository }
from "../../repositories/profile/profile.repository";


export const updateProfile = (
  profileRepo = profileRepository()
) => async (
  userId: string,
  data: any
) => {

  await profileRepo.updateProfile(
    userId,
    data
  );

  return {
    message: "Profile updated"
  };
};