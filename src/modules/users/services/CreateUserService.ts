import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UserRepository from "../infra/typeorm/repositories/UserRepository";
import User from "../infra/typeorm/entities/User";
import { hash } from "bcryptjs";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: UserRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    /* Verificar se ninguem esta o usando o email */
    const emailExists = await userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("email already exists");
    }

    /* transformando a senha em um hash para criptografar */
    const hashPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
