import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
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

  @UpdateDateColumn()
  updated_at: Date;
}

export default Customer;
