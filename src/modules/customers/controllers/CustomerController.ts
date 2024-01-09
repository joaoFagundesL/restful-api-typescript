import { Request, Response } from "express";
import ListCustomerService from "../services/ListCustomerService";
import ShowCustomerService from "../services/ShowCustomerService";
import CreateCustomerService from "../services/CreateCustomerService";
import UpdateCustomerService from "../services/UpdateCustomerService";
import DeleteCustomerService from "../services/DeleteCustomerService";

export default class CustomerController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listCustomers = new ListCustomerService();

    const customers = await listCustomers.execute();

    return res.json(customers);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const id = req.query.id ? +req.query.id : undefined;

    if (id === undefined) {
      throw new Error("undefined id");
    }

    const showCustomer = new ShowCustomerService();

    const customer = await showCustomer.execute({ id });

    return res.json(customer);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    const createCustomer = new CreateCustomerService();

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

    const deleteCustomer = new DeleteCustomerService();

    await deleteCustomer.execute({ id });

    /* Nao retorna nada */
    return res.json([]);
  }
}
