import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UserRepository from "../typeorm/repositories/UserRepository";
import User from "../typeorm/entities/User";
import { compare, hash } from "bcryptjs";
import { Secret, sign } from "jsonwebtoken";
import authConfig from "@config/auth";

interface UserRequest {
  email: string;
  password: string;
}

interface UserToken {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: UserRequest): Promise<UserToken> {
    const userRepository = getCustomRepository(UserRepository);

    /* Verificar se ninguem esta o usando o email */
    const user = await userRepository.findByEmail(email);

    /* Caso o usuario tenha informado o email errado */
    if (!user) {
      throw new AppError("incorrect email/password", 401);
    }

    /* como é um hash a senha eu uso o metodo do bcryptjs */
    const passwordConfirmed = await compare(password, user.password);

    /* caso a senha esteja errada */
    if (!passwordConfirmed) {
      throw new AppError("incorrect email/password", 401);
    }

    /* o payload vai ser usado na aplicacao front end para buscar dados do usuario, mas eu ja
     * estou retornando o user tambem entao nao ha necessidade de usar o payload */

    /* o segundo parametro é um hash md5 que foi gerado e vai ser usado para criar o token */

    /* authConfig é o que eu exportei em config/auth assim fica de uso global, mas poderia ter
     * usado a secret direto aqui */
    const token = sign({}, authConfig.jwt.secret as Secret, {
      subject: String(
        user.id,
      ) /* como user.id é um number foi preciso converter para nao dar erro */,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionService;
