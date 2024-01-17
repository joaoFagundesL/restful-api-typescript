import { getCustomRepository } from "typeorm";
import UserRepository from "../infra/typeorm/repositories/UserRepository";
import User from "../infra/typeorm/entities/User";

class ListUserService {
  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository);

    const user = userRepository.find();

    return user;
  }
}

export default ListUserService;
