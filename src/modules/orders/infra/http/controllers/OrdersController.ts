import { Request, Response } from "express";
import ShowOrderService from "@modules/orders/services/ShowOrderService";
import CreateOrderService from "@modules/orders/services/CreateOrderService";

export default class OrdersController {
  public async show(req: Request, res: Response): Promise<Response> {
    const id = req.query.id ? +req.query.id : undefined;

    if (id === undefined) {
      throw new Error("undefined id");
    }

    const showOrder = new ShowOrderService();

    const order = await showOrder.execute({ id });

    return res.json(order);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { customer_id, products } = req.body;

    const createOrder = new CreateOrderService();

    const order = await createOrder.execute({ customer_id, products });

    return res.json(order);
  }
}
