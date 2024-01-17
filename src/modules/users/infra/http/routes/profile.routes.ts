import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ProfileController from "../controllers/ProfileController";
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";

const profileRouter = Router();
const profileController = new ProfileController();

/* chamo antes para nao precisar colocar em cada rota, ja quem vem antes
 * ele precisa estar autenticado para acessar as demais rotas */
profileRouter.use(isAuthenticated);

profileRouter.get("/", profileController.show);

profileRouter.put(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string() /* usuario pode nao querer trocar a senha, 
      esse campo so precisa quando o usuario quer trocar a senha e ele precisa confirma a antiga*/,

      /* as outras validacoes do old_password, por exemplo quando ele quer trocar a senha e
       * é de fato obrigatorio esta no service de UpdateProfileService */

      password: Joi.string().optional(),

      /* diz que caso o usuario queira trocar a password entao eu ele vai ter que
       * preencher a senha de confirmacao e ele vai ser obrigatoria */
      password_confirmation: Joi.string()
        .valid(Joi.ref("password"))
        .when("password", {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  }),
  profileController.update,
);

export default profileRouter;
