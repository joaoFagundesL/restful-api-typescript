import { EntityRepository, Repository } from "typeorm";
import Order from "../entities/Order";
import Customer from "@modules/customers/typeorm/entities/Customer";

interface IProduct {
  product_id: number;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IProduct[] /* order pode ter varios produtos */;
}

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  public async findById(id: number): Promise<Order | undefined> {
    const order = this.findOne(id, {
      /* alem de trazer os dados da order, trazer os outros dados relacionados a chaves fk, bem
       * como os dados do customer e do order_products */
      relations: ["order_products", "customer"],
    });

    return order;
  }

  public async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = this.create({
      customer,
      order_products:
        products /* order_products é oq esta mapeado na entidade Order */,
    });

    await this.save(order);

    return order;
  }
}
