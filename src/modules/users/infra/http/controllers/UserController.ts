import CreateUserService from "@modules/users/services/CreateUserService";
import ListUserService from "@modules/users/services/ListUserService";
import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";

export default class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUser = new ListUserService();

    const users = await listUser.execute();

    return res.json(instanceToInstance(users));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, password, email } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, password, email });

    return res.json(instanceToInstance(user));
  }
}
