import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import { isAfter, addHours } from "date-fns";
import UserRepository from "../typeorm/repositories/UserRepository";
import UserTokenRepository from "../typeorm/repositories/UserTokenRepository";
import { hash } from "bcryptjs";

interface UserRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: UserRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);

    const userTokenRepository = getCustomRepository(UserTokenRepository);

    /* procura se o token existe e se existe ver quem é o id que esta associado
     * a ele para ter os dados do user */
    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError("user token not found");
    }

    /* a tabela users_tokens tem um campo user_id que é a chave fk de users
     * ou seja, é o id do usuario a quem pertence o token por isso eu estou usando
     * user_id e nao id, ja que id seria o id do registro da tabela e nao do usuario em si
     * */
    const user = await userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError("user not found");
    }

    /* verificar o prazo de validade do token, caso tenha passado de um determinado
     * tempo ele nao sera mais valido */

    const tokenCreatedAt = userToken.created_at;

    /* pega o horario que o token foi criado e adiciona 2 horas que seria
     * o prazo de validade */
    const cmpDate = addHours(tokenCreatedAt, 2);

    /* caso tenha passado o prazo */
    if (isAfter(Date.now(), cmpDate)) {
      throw new AppError("expired token");
    }

    /* pode atualizar a senha caso o token esteja ok, porem a senha esta sem
     * criptografia, por isso tem que fazer o hash */

    /* await pois o hash é um metodo assync */
    user.password = await hash(password, 8);
  }
}

export default ResetPasswordService;
