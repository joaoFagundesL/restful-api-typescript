import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Entity,
} from "typeorm";

@Entity("customers")
class Customer {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Customer;
