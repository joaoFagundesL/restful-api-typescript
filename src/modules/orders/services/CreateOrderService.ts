import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Order from "../typeorm/entities/Order";
import { OrdersRepository } from "../typeorm/repositories/OrdersRepository";
import CustomerRepository from "@modules/customers/typeorm/repositories/CustomerRepository";
import { ProductRepository } from "@modules/products/typeorm/repositories/ProductRepository";

interface IProduct {
  id: number;
  quantity: number;
}

interface IRequest {
  customer_id: number;
  products: IProduct[];
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomerRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    const customerExists = await customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError("Invalid customer");
    }

    const productsExist = await productsRepository.findByIds(products);

    if (!productsExist.length) {
      /* caso o array seja vazio */
      throw new AppError("Invalid products ids");
    }

    const productsExistIds = productsExist.map((product) => product.id);

    /* productsExistIds pega todos o produtos que foram retornados pelo findAll,
     * sendo que algum produto pode ter ficado de fora por ser invalido. Agora eu pego o
     * array que foi passado products e verifico se nao existe um produto em
     * productsExistIds */

    /* Outra solucao: pegar o array com todos ids e colocar em um hash. Depois
     * eu itero o segundo array e a cada vez que um elemento do array2 estiver no hash
     * eu removo o elemento do hash. Caso o hash esteja vazio entao os arrays sao iguais
     * , caso contrario o hash vai ter apenas o elementos diferentes */
    const checkInexistentProducts = products.filter(
      (product) => !productsExistIds.includes(product.id),
    );

    /* array com todos os produtos que nao estao em productsExistIds */
    if (productsExistIds.length) {
      throw new AppError(
        `could not find product ${checkInexistentProducts[0].id}`,
      );
    }
  }
}

export default CreateOrderService;
