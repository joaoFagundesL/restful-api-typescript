import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { AuthUserController } from "../controllers/AuthUserController";
import ForgotPasswordController from "../controllers/ForgotPasswordController";

const passwordRouter = Router();
const forgotPassworController = new ForgotPasswordController();

passwordRouter.post(
  "/forgot",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPassworController.create,
);

export default passwordRouter;
