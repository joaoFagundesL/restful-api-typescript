import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import OrdersProducts from "./OrdersProducts";

@Entity("orders")
class Order {
  @PrimaryGeneratedColumn("increment")
  id: number;

  /* Em customer eu poderia adicionar também essa informacao que no caso seria OneToMany
   * caso eu queria outras informacoes*/
  @ManyToOne(() => Customer)
  @JoinColumn({ name: "customer_id" })
  customer: Customer; /* many to one, muitas orders de um unico cliente */

  /* order_products e order é um relaciomento 1-n onde order_products é a tabela
   * que surgiu a partir do relacionmento n-m entre order e product, logo é preciso
   * configurar tanto em order quanto em OrdersProducts */

  /*
   * Com cascade: true, se você criar uma nova instância de Order e associar
   * algumas instâncias de OrdersProducts a ela, ao salvar a instância do Order,
   * o TypeORM automaticamente persistirá também as instâncias de OrdersProducts.
   * */
  @OneToMany(() => OrdersProducts, (order_products) => order_products.order, {
    cascade: true,
  })
  order_products: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
