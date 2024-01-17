import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { AuthUserController } from "../controllers/AuthUserController";
import ForgotPasswordController from "../controllers/ForgotPasswordController";
import ResetPasswordController from "../controllers/ResetPasswordController";

const passwordRouter = Router();
const forgotPassworController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

/* todas as rotas aqui devem ser precedidas de /password
 * Exemplo:
 * http://localhost:3333/password/forgot
 */

passwordRouter.post(
  "/forgot",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPassworController.create,
);

passwordRouter.post(
  "/reset",
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      /* ele vai ter um campo adicional para digitar a senha novamente, e nesse
       * caso foi preciso utilizar o joi.ref para verificar se os campos das senhas
       * batem */
      password_confirmation: Joi.string().required().valid(Joi.ref("password")),
    },
  }),
  resetPasswordController.create,
);

export default passwordRouter;
