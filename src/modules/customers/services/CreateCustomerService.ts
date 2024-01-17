import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import CustomerRepository from "../infra/typeorm/repositories/CustomerRepository";
import Customer from "../infra/typeorm/entities/Customer";

interface CustomerRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: CustomerRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);

    /* Verificar se ninguem esta o usando o email */
    const emailExists = await customerRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("email already exists");
    }

    const customer = customerRepository.create({
      name,
      email,
    });

    await customerRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
