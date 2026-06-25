import { NotFoundError }
from "../../errors/not-found.error";

import { ProfileRepository }
from "../../repositories/profile/profile.repository";

export class GetProfileService {

  constructor(
    private profileRepo =
      new ProfileRepository()
  ) {}

  async execute(
    userId: string
  ) {

    const user =
      await this.profileRepo
        .findById(userId);

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
      isVerified:
        user.isVerified
    };
  }
}