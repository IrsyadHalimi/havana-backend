import { ProfileRepository }
from "../../repositories/profile/profile.repository";

export class UploadAvatarService {

  constructor(
    private profileRepo =
      new ProfileRepository()
  ) {}

  async execute(
    userId: string,
    avatar: string
  ) {

    await this.profileRepo
      .updateAvatar(
        userId,
        avatar
      );

    return {
      message:
        "Avatar uploaded"
    };
  }
}