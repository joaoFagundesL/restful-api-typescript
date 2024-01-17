import { ICustomerRepository } from "../domain/repositories/ICustomerRepository";
import { ICustomer } from "../domain/model/ICustomer";
import { inject, injectable } from "tsyringe";

@injectable()
class ListCustomerService {
  constructor(
    @inject("CustomerRepository")
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute(): Promise<ICustomer[]> {
    const user = this.customerRepository.find();

    return user;
  }
}

export default ListCustomerService;
