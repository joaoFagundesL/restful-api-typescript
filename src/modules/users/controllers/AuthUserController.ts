import { Request, Response } from "express";
import CreateSessionService from "../services/CreateSessionService";

class AuthUserController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authUserService = new CreateSessionService();

    /* Colocar o await para esperar a resposta e passar os dados para
     * o metodo que vai autenticar para dizer se o email e senhas estao certos */
    const auth = await authUserService.execute({ email, password });

    return res.json(auth);
  }
}

export { AuthUserController };
