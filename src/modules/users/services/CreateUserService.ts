import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UserRepository from "../typeorm/repositories/UserRepository";
import User from "../typeorm/entities/User";

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

    const user = userRepository.create({
      name,
      email,
      password,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
