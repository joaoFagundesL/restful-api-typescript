import { ICreateCustomer } from "../model/ICreateCustomer";
import { ICustomer } from "../model/ICustomer";

export interface ICustomerRepository {
  findByName(name: string): Promise<ICustomer | undefined>;
  findById(id: number): Promise<ICustomer | undefined>;
  findByEmail(email: string): Promise<ICustomer | undefined>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  save(data: ICreateCustomer): Promise<ICustomer>;
  remove(customer: ICustomer): Promise<ICustomer>;
  find(): Promise<ICustomer[]>;
}
