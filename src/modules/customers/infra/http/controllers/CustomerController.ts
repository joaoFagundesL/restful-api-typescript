import { Request, Response } from "express";
import ListCustomerService from "@modules/customers/services/ListCustomerService";
import ShowCustomerService from "@modules/customers/services/ShowCustomerService";
import CreateCustomerService from "@modules/customers/services/CreateCustomerService";
import UpdateCustomerService from "@modules/customers/services/UpdateCustomerService";
import DeleteCustomerService from "@modules/customers/services/DeleteCustomerService";
import { container } from "tsyringe";

export default class CustomerController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listCustomers = container.resolve(ListCustomerService);

    const customers = await listCustomers.execute();

    return res.json(customers);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const id = req.query.id ? +req.query.id : undefined;

    if (id === undefined) {
      throw new Error("undefined id");
    }

    const showCustomer = container.resolve(ShowCustomerService);

    const customer = await showCustomer.execute({ id });

    return res.json(customer);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    /* para evitar esses new toda hora é feito uma injecao
     * de dependencia que é configurada no arquivo container/index.ts e no
     * CreateCustomerService */
    // const customerRepository = new CustomerRepository();
    // const createCustomer = new CreateCustomerService(customerRepository);

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({ name, email });

    return res.json(customer);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, name, email } = req.body;

    const updateCustomer = new UpdateCustomerService();

    const customer = await updateCustomer.execute({ id, name, email });

    return res.json(customer);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const id = req.query.id ? +req.query.id : undefined;

    if (id === undefined) {
      throw new Error("undefined id");
    }

    const deleteCustomer = container.resolve(DeleteCustomerService);

    await deleteCustomer.execute({ id });

    /* Nao retorna nada */
    return res.json([]);
  }
}
