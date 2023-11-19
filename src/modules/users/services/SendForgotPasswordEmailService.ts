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

    const { token } = await userTokenRepository.generate(user.id);

    /* o body do EtherealMail dizia que userToken poderia ser undefined ja que o metodo
     * generate poderia retornar uma promise do tipo undefined,  e para
     * nao ter que fazer um if eu removi o undefined da funcao generate
     */

    // if (token == undefined) {
    //   throw new Error("userToken undefined");
    // }

    // console.log(userToken);

    await EtherealMail.sendMail({
      to: {
        email: user.email,
        name: user.name,
      },

      subject: "[API VENDAS] Recuperacao de senha",
      templateData: {
        /* notacao {{}} é usada para variaveis que é possivel gracas ao handlebars que foi
         * importado */
        template: `Ola {{name}}: {{token}} `,
        variables: {
          name: user.name,

          token /* posso passar assim pois o nome da prorpieda e o nome do valor */,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
