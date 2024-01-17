import { Router } from "express";
import ProductController from "../controllers/ProductController";
/* Vai ser usado para fazer a validacao dos dados */
import { celebrate, Joi, Segments } from "celebrate";

const productsRouter = Router();
const productController = new ProductController();

productsRouter.get("/", productController.index);

productsRouter.get(
  "/show",
  celebrate({
    [Segments.QUERY]: {
      id: Joi.number().required(),
    },
  }),
  productController.show,
);

productsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2) /* valida as casas decimais */,
      quantity: Joi.number().required(),
    },
  }),
  productController.create,
);

productsRouter.put(
  "/update",
  celebrate({
    [Segments.BODY]: {
      id: Joi.number().required(),
      name: Joi.string().required(),
      price: Joi.number().precision(2),
      quantity: Joi.number().required(),
    },
  }),
  productController.update,
);

productsRouter.delete(
  "/",
  celebrate({
    [Segments.QUERY]: {
      id: Joi.number().required(),
    },
  }),
  productController.delete,
);

export default productsRouter;
