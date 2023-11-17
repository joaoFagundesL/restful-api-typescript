import { Request, Response } from "express";
import SendForgotPasswordEmailService from "../services/SendForgotPasswordEmailService";
import ResetPasswordService from "../services/ResetPasswordService";

/* depois de ter gerado o token para um usuario especifico eu pego o token
 * e passo para o service verificar se o mesmo é valido e alterar a senha */

export default class ResetPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    /* o token que deve ser passado é o que foi gerado na classe de
     * SendForgotPasswordEmailService */
    const { token, password } = req.body;

    const resetPassord = new ResetPasswordService();

    await resetPassord.execute({ token, password });

    return res.status(204).json();
  }
}
