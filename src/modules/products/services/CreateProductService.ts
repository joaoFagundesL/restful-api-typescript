import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/Product";
import RedisCache from "@shared/cache/RedisCache";

interface ProductRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({
    name,
    price,
    quantity,
  }: ProductRequest): Promise<Product> {
    /* async sempre retorna uma promise */

    /* chamando o repositorio customizado que eu fiz */
    const productsRepository = getCustomRepository(ProductRepository);

    /* verifica se o produto ja existe */
    const productExists = await productsRepository.findByName(name);

    /* o código ele vai pegar por padrao o 400 que é o que eu defini no AppError */
    if (productExists) {
      throw new AppError("Product already exists");
    }

    const redisCache = new RedisCache();

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    /* invalidar o cache do redis, assim a quando altera alguma coisa
     * a primeira consulta sera feita no banco e depois no redis, caso nao seja invalidado
     * ele nao vai saber que alterou alguma coisa e o cache vai se manter sempre o mesmo*/
    await redisCache.invalidate("api-vendas-PRODUCT_LIST");

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
