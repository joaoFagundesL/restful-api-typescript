import { Request, Response } from "express";
import ShowProfileService from "@modules/users/services/ShowProfileService";
import UpdateProfileService from "@modules/users/services/UpdateProfileService";
import { instanceToInstance } from "class-transformer";

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const showProfile = new ShowProfileService();

    /* pega os dados do usuario logado */
    const user_id = req.user_id;

    const user = await showProfile.execute({ user_id });

    return res.json(instanceToInstance(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user_id;

    const { name, password, email, old_password } = req.body;

    const updateProfile = new UpdateProfileService();

    const user = await updateProfile.execute({
      user_id,
      name,
      password,
      email,
      old_password,
    });

    return res.json(instanceToInstance(user));
  }
}
