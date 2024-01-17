import { Request, Response } from "express";
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import { instanceToInstance } from "class-transformer";

export default class UpdateUserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const user = updateAvatar.execute({
      /* acessando o user_id por meio do @types que eu configurei */
      user_id: req.user_id,
      avatarFilename: req.file?.filename as string,
    });

    return res.json(instanceToInstance(user));
  }
}
