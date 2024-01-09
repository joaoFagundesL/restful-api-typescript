import { getCustomRepository } from "typeorm";
import CustomerRepository from "../typeorm/repositories/CustomerRepository";
import Customer from "../typeorm/entities/Customer";

class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const userRepository = getCustomRepository(CustomerRepository);

    const user = userRepository.find();

    return user;
  }
}

export default ListCustomerService;
