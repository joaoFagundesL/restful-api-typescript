import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UserRepository from "../typeorm/repositories/UserRepository";
import User from "../typeorm/entities/User";
import { compare, hash } from "bcryptjs";

interface UserRequest {
  email: string;
  password: string;
}

class CreateSessionService {
  public async execute({ email, password }: UserRequest): Promise<UserRequest> {
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

    return user;
  }
}

export default CreateSessionService;
