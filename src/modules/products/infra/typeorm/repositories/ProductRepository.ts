import { EntityRepository, In, Repository } from "typeorm";
import Product from "../entities/Product";

interface IFindProducts {
  id: number;
}

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    /* constroi o array com os id que foram informados por parametro */
    const productIds = products.map((product) => product.id);

    /* pegando os produtos que existem nesse array */
    const productsExist = await this.find({
      where: {
        id: In(productIds),
      },
    });

    return productsExist;
  }
}
