import { ProfileRepository }
from "../../repositories/profile/profile.repository";

export class UpdateProfileService {

  constructor(
    private profileRepo =
      new ProfileRepository()
  ) {}

  async execute(
    userId: string,
    data: any
  ) {

    await this.profileRepo
      .updateProfile(
        userId,
        data
      );

    return {
      message:
        "Profile updated"
    };
  }
}