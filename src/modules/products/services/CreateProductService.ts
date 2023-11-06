import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/Product";

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

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
