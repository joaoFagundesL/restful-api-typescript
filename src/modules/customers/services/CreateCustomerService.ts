/* sem nada de importacao do typeorm, desacoplado seguindo SOLID */
import AppError from "@shared/errors/AppError";
import { ICustomer } from "../domain/model/ICustomer";
import { ICreateCustomer } from "../domain/model/ICreateCustomer";
import { ICustomerRepository } from "../domain/repositories/ICustomerRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateCustomerService {
  constructor(
    @inject("CustomerRepository")
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
    /* Verificar se ninguem esta o usando o email */
    const emailExists = await this.customerRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("email already exists");
    }

    const customer = await this.customerRepository.create({
      name,
      email,
    });

    return customer;
  }
}

export default CreateCustomerService;
