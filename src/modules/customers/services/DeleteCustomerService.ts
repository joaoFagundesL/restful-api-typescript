import AppError from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";
import { ICustomerRepository } from "../domain/repositories/ICustomerRepository";

interface IRequest {
  id: number;
}

@injectable()
class DeleteCustomerService {
  constructor(
    @inject("CustomerRepository")
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError("customer not found!");
    }

    await this.customerRepository.remove(customer);
  }
}

export default DeleteCustomerService;
