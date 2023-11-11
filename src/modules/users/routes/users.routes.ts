import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import multer from "multer";
import uploadConfig from "@config/upload";
import UserController from "../controllers/UserController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import UpdateUserAvatarController from "../controllers/UpdateUserAvatarController";

const usersRouter = Router();
const usersController = new UserController();
const userAvatarController = new UpdateUserAvatarController();

const upload = multer(uploadConfig);

usersRouter.get("/", isAuthenticated, usersController.index);

usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

/* patch pois vai atualizar apenas um campo do user que é o avatar,
 * e quando é assim (uma alteracao pequena) usa o patch */
usersRouter.patch(
  "/avatar",
  isAuthenticated,
  upload.single("avatar"),
  userAvatarController.update,
);

export default usersRouter;
