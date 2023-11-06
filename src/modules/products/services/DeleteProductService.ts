import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import AppError from "@shared/errors/AppError";

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

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
