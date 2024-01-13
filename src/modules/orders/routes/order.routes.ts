import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import OrdersController from "../controllers/OrdersController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(isAuthenticated);

ordersRouter.get(
  "/show",
  celebrate({
    [Segments.QUERY]: {
      id: Joi.number().required(),
    },
  }),
  ordersController.show,
);

ordersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.number().required(),
      products: Joi.required(),
    },
  }),
  ordersController.create,
);

export default ordersRouter;
