import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../infra/typeorm/repositories/ProductRepository";
import AppError from "@shared/errors/AppError";
import Product from "../infra/typeorm/entities/Product";
import RedisCache from "@shared/cache/RedisCache";

interface ProductRequest {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: ProductRequest): Promise<Product> {
    /* chamando o repositorio customizado que eu fiz */
    const productsRepository = getCustomRepository(ProductRepository);

    /* findOne lista um produto especifico */
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError("product not found");
    }

    /* Caso o nome do produto ja exista nao vai ser possivel atualizar */
    if (name === product.name) {
      throw new AppError("Product already exists");
    }

    const redisCache = new RedisCache();

    /* invalidar o cache do redis, assim a quando altera alguma coisa
     * a primeira consulta sera feita no banco e depois no redis, caso nao seja invalidado
     * ele nao vai saber que alterou alguma coisa e o cache vai se manter sempre o mesmo*/
    await redisCache.invalidate("api-vendas-PRODUCT_LIST");

    /* Caso esteja tudo certo pode atualizar os dados */
    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
