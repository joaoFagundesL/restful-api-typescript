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
    if (checkInexistentProducts.length) {
      throw new AppError(
        `could not find product ${checkInexistentProducts[0].id}`,
      );
    }

    /* validar a quantidade em estoque. Pega o array que o usuario
     * informou e filtra os products que foram encontrados pelo findAll. Caso algum
     * produto do findAll tenha a quantidade em estoque menor que a quantidade que eu quero entao
     * nao é possivel. Por exemplo, se em estoque tem 5 e eu quero 20, entao 5 < 20 nao é possivel
     * */
    const quantityAvailable = products.filter(
      (product) =>
        productsExist.filter((p) => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `quantity ${quantityAvailable[0].quantity} is not available`,
      );
    }

    const serializedProducts = products.map((product) => ({
      product_id: product.id,
      quantity: product.quantity,

      /* o price vem do array que foi utilizado no findAll,
       * como os id's sao uniques vai retornar sempre um array de 1
       * posicao entao posso pegar sempre na posicao [0] */
      price: productsExist.filter((p) => p.id === product.id)[0].price,
    }));

    /* cria a order */
    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    /* atualiza a quantidade */
    const { order_products } = order;

    const updatedQuantity = order_products.map((product) => ({
      id: product.product_id,
      quantity:
        productsExist.filter((p) => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await productsRepository.save(updatedQuantity);

    return order;
  }
}

export default CreateOrderService;
