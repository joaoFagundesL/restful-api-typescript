import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import AppError from "@shared/errors/AppError";
import RedisCache from "@shared/cache/RedisCache";

interface ProductRequest {
  id: number;
}

class DeleteProductService {
  public async execute({ id }: ProductRequest): Promise<void> {
    /* chamando o repositorio customizado que eu fiz */
    const productsRepository = getCustomRepository(ProductRepository);

    /* findOne lista um produto especifico */
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError("product not found");
    }

    const redisCache = new RedisCache();

    /* invalidar o cache do redis, assim a quando altera alguma coisa
     * a primeira consulta sera feita no banco e depois no redis, caso nao seja invalidado
     * ele nao vai saber que alterou alguma coisa e o cache vai se manter sempre o mesmo*/
    await redisCache.invalidate("api-vendas-PRODUCT_LIST");

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
