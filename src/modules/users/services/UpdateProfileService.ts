import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";
import User from "../typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";

interface IRequest {
  user_id: number;
  name: string;
  email: string;
  password?: string /* caso ele nao queria atualizar a senha, senao nos ifs
  ele sempre vai ter que infromar a senha mesmo que ele nao queira troca-la */;

  old_password?: string /* considerando que o usuario ja esta logado e ele quer alterar a senha
  ele vai ter que informar a senha antiga */;
}

/* aqui é quando o usuario ja esta logado na conta, e nao precisa de token para trocar
 * o email, pois ele ja entrou na conta por meio de um token valido entao nao tem essa
 * necessidade */
class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError("user not found!");
    }

    /* nao pode atualizar o email se o mesmo ja estiver em uso,
     * porem se eu buscar o usuario pelo email vai retornar o email proprio
     * dele */
    const userUpdateEmail = await userRepository.findByEmail(email);

    /* aqui eu faco entao a verificacao para descartar o email do usuario, ja
     * que pode retornar o email que ele esta usando */

    /* eu uso !== pq caso nao seja o email quer dizer que ele esta tentando atualizar um
     * email que ja esta em uso por um outro usuario de outro id */
    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError("Email already being used");
    }

    /* caso ele queira mudar a senha atual, mas nao informou a senha antiga */
    if (password && !old_password) {
      throw new AppError("Old password is required!");
    }

    /* caso ele tenha informado as duas senhas */
    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("Old password does not match");
      }

      /* salva em hash a senha */
      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
