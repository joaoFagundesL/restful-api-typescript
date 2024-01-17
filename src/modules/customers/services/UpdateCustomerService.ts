import AppError from "@shared/errors/AppError";
import { ICustomerRepository } from "../domain/repositories/ICustomerRepository";
import { injectable, inject } from "tsyringe";
import { ICustomer } from "../domain/model/ICustomer";

interface IRequest {
  id: number;
  name: string;
  email: string;
}

@injectable()
class UpdateCustomerService {
  constructor(
    @inject("CustomerRepository")
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({ id, name, email }: IRequest): Promise<ICustomer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError("user not found!");
    }

    /* nao pode atualizar o email se o mesmo ja estiver em uso,
     * porem se eu buscar o usuario pelo email vai retornar o email proprio
     * dele */
    const userUpdateEmail = await this.customerRepository.findByEmail(email);

    /* aqui eu faco entao a verificacao para descartar o email do usuario, ja
     * que pode retornar o email que ele esta usando */

    /* eu uso !== pq caso nao seja o email quer dizer que ele esta tentando atualizar um
     * email que ja esta em uso por um outro usuario de outro id */
    if (userUpdateEmail && userUpdateEmail.id !== id) {
      throw new AppError("Email already being used");
    }

    customer.name = name;
    customer.email = email;

    await this.customerRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
