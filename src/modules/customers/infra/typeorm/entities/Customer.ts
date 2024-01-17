import { ICustomer } from "@modules/customers/domain/model/ICustomer";
import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
} from "typeorm";

@Entity("customers")
class Customer implements ICustomer {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Customer;
