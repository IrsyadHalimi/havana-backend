import {
  UserRepository
} from "../../repositories/auth/user.repository";

export class LogoutService {

  constructor(
    private userRepo =
      new UserRepository()
  ) {}

  async execute(
    userId: string
  ) {

    await this.userRepo
      .removeRefreshToken(
        userId
      );

    return {
      message:
        "Logout success"
    };
  }
}