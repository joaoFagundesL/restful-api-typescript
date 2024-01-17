import AppError from "@shared/errors/AppError";
import { ICustomer } from "../domain/model/ICustomer";
import { ICustomerRepository } from "../domain/repositories/ICustomerRepository";
import { injectable, inject } from "tsyringe";

interface IRequest {
  id: number;
}

@injectable()
class ShowCustomerService {
  constructor(
    @inject("CustomerRepository")
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<ICustomer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError("customer not found!");
    }

    return customer;
  }
}

export default ShowCustomerService;
