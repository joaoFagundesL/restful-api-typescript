import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Order from "../infra/typeorm/entities/Order";
import { OrdersRepository } from "../infra/typeorm/repositories/OrdersRepository";

interface IRequest {
  id: number;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = await ordersRepository.findById(id);

    if (!order) {
      throw new AppError("Invalid order");
    }

    return order;
  }
}

export default ShowOrderService;
