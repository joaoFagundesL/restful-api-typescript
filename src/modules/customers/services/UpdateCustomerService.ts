import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Customer from "../infra/typeorm/entities/Customer";
import CustomerRepository from "../infra/typeorm/repositories/CustomerRepository";

interface IRequest {
  id: number;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError("user not found!");
    }

    /* nao pode atualizar o email se o mesmo ja estiver em uso,
     * porem se eu buscar o usuario pelo email vai retornar o email proprio
     * dele */
    const userUpdateEmail = await customerRepository.findByEmail(email);

    /* aqui eu faco entao a verificacao para descartar o email do usuario, ja
     * que pode retornar o email que ele esta usando */

    /* eu uso !== pq caso nao seja o email quer dizer que ele esta tentando atualizar um
     * email que ja esta em uso por um outro usuario de outro id */
    if (userUpdateEmail && userUpdateEmail.id !== id) {
      throw new AppError("Email already being used");
    }

    customer.name = name;
    customer.email = email;

    await customerRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
