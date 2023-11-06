import { Router } from "express";
import ProductController from "../controllers/ProductController";

const productsRouter = Router();
const productController = new ProductController();

productsRouter.get("/", productController.index);
productsRouter.get("/show", productController.show);
productsRouter.post("/", productController.create);
productsRouter.put("/update", productController.update);
productsRouter.delete("/", productController.delete);

export default productsRouter;
