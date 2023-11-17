import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UserRepository from "../typeorm/repositories/UserRepository";
import UserTokenRepository from "../typeorm/repositories/UserTokenRepository";
import EtherealMail from "@config/mail/EtherealMail";

interface UserRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: UserRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);

    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("user not found");
    }

    const userToken = await userTokenRepository.generate(user.id);

    /* o body do EtherealMail dizia que userToken poderia ser undefined */
    if (userToken == undefined) {
      throw new Error("userToken undefined");
    }

    // console.log(userToken);
    //
    await EtherealMail.sendMail({
      to: email,
      body: `Token para recuperação de senha:  ${userToken.token} `,
    });
  }
}

export default SendForgotPasswordEmailService;
