import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Customer from "../infra/typeorm/entities/Customer";
import CustomerRepository from "../infra/typeorm/repositories/CustomerRepository";

interface IRequest {
  id: number;
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError("customer not found!");
    }

    return customer;
  }
}

export default ShowCustomerService;
