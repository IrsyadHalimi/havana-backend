import { addHours } from "date-fns";

import { UserRepository }
from "../../repositories/auth/user.repository";

import { EmailVerificationRepository }
from "../../repositories/auth/email-verification.repository";

import { generateToken }
from "../../utils/token";

import { ConflictError }
from "../../errors/conflict.error";

export class RegisterService {

  constructor(
    private userRepo =
      new UserRepository(),

    private verificationRepo =
      new EmailVerificationRepository()
  ) {}

  async execute(data:any) {

    const existing =
      await this.userRepo.findByEmail(
        data.email
      );

    if(existing){
      throw new ConflictError(
        "Email already registered"
      );
    }

    const user =
      await this.userRepo.create({
        fullName:data.fullName,
        email:data.email,
        role:data.role
      });

    const token =
      generateToken();

    await this.verificationRepo.create({
      userId:user.id,
      token,
      expiredAt:addHours(
        new Date(),
        1
      )
    });

    /**
     * next sprint:
     * send email
     */

    return {
      message:
      "Registration success. Please verify email."
    };
  }

}