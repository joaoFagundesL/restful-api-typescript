import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import Product from "../typeorm/entities/Product";
import RedisCache from "@shared/cache/RedisCache";

class ListProductService {
  public async execute(): Promise<Product[]> {
    /* Array pq eu to retornando todos os produtos */

    /* chamando o repositorio customizado que eu fiz */
    const productsRepository = getCustomRepository(ProductRepository);

    const redisCache = new RedisCache();

    /* primeiro busca os produtos com a nome da key no redis */
    let products = await redisCache.recover<Product[]>(
      "api-vendas-PRODUCT_LIST",
    );

    /* caso nao haja produtos no cache entao ele consulta o banco */
    if (!products) {
      products = await productsRepository.find();
      await redisCache.save("api-vendas-PRODUCT_LIST", products);
    }

    return products;
  }
}

export default ListProductService;
