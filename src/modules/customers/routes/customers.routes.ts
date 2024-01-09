import { Router } from "express";
/* Vai ser usado para fazer a validacao dos dados */
import { celebrate, Joi, Segments } from "celebrate";
import CustomerController from "../controllers/CustomerController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const customersRouter = Router();
const customerController = new CustomerController();

customersRouter.use(isAuthenticated);

customersRouter.get("/", customerController.index);

customersRouter.get(
  "/show",
  celebrate({
    [Segments.QUERY]: {
      id: Joi.number().required(),
    },
  }),
  customerController.show,
);

customersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  customerController.create,
);

customersRouter.put(
  "/update",
  celebrate({
    [Segments.BODY]: {
      id: Joi.number().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  customerController.update,
);

customersRouter.delete(
  "/",
  celebrate({
    [Segments.QUERY]: {
      id: Joi.number().required(),
    },
  }),
  customerController.delete,
);

export default customersRouter;
