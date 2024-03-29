import { Request, Response } from "express";
import ListProductService from "@modules/products/services/ListProductService";
import ShowProductService from "@modules/products/services/ShowProductService";
import CreateProductService from "@modules/products/services/CreateProductService";
import UpdateProductService from "@modules/products/services/UpdateProductService";
import DeleteProductService from "@modules/products/services/DeleteProductService";

export default class ProductController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listProducts = new ListProductService();

    const products = await listProducts.execute();

    return res.json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const id = req.query.id ? +req.query.id : undefined;

    if (id === undefined) {
      throw new Error("undefined id");
    }

    const showProduct = new ShowProductService();

    const product = await showProduct.execute({ id });

    return res.json(product);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({ name, price, quantity });

    return res.json(product);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, name, price, quantity } = req.body;

    const updateProduct = new UpdateProductService();

    const product = await updateProduct.execute({ id, name, price, quantity });

    return res.json(product);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const id = req.query.id ? +req.query.id : undefined;

    if (id === undefined) {
      throw new Error("undefined id");
    }

    const deleteProduct = new DeleteProductService();

    await deleteProduct.execute({ id });

    /* Nao retorna nada */
    return res.json([]);
  }
}
