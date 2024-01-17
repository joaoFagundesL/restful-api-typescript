import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UserRepository from "../infra/typeorm/repositories/UserRepository";
import User from "../infra/typeorm/entities/User";
import path from "path";
import uploadConfig from "@config/upload";
import fs from "fs";

interface UserRequest {
  user_id: number;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({
    avatarFilename,
    user_id,
  }: UserRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError("user not found!");
    }

    if (user.avatar) {
      /* pega o caminho completo de onde os arquivos estao */
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      /* verifica se ja existe um arquivo */
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      /* caso exista, remove o arquivo para evitar muitas imagens */
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    /* cadastrar o avatar que o usuario enviou */
    user.avatar = avatarFilename;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
