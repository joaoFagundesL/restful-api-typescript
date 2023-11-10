import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { AuthUserController } from "../controllers/AuthUserController";

const sessionsRouter = Router();
const authController = new AuthUserController();

sessionsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authController.handle,
);

export default sessionsRouter;
