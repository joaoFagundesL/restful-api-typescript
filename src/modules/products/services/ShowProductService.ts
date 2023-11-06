import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/Product";

interface ProductRequest {
  id: number;
}

class ShowProductService {
  public async execute({ id }: ProductRequest): Promise<Product> {
    /* chamando o repositorio customizado que eu fiz */
    const productsRepository = getCustomRepository(ProductRepository);

    /* findOne lista um produto especifico */
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError("product not found");
    }

    return product;
  }
}

export default ShowProductService;
