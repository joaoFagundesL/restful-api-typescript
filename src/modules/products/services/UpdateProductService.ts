import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/Product";

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

    /* Caso esteja tudo certo pode atualizar os dados */
    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
