import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Order from "./Order";
import Product from "@modules/products/typeorm/entities/Product";

/* tabela que surgiu do relacionamento n-m entre orders e products */

@Entity("orders_products")
class OrdersProducts {
  @PrimaryGeneratedColumn("increment")
  id: number;

  /* Como essa é a tabela que surgiu do relacionamento n-m entre product e order
   * ela é obrigatoriamente many-to-one com product e order. Porem é preciso
   * configurar order e product também para eu poder pegar todos os registros */
  @ManyToOne(() => Order, (order) => order.order_products)
  @JoinColumn({ name: "order_id" })
  order: Order;

@ManyToOne(() => Product, (product) => product.)
  @JoinColumn({ name: "product_id" })
  product: Product;



  @Column("decimal")
  price: number;

  @Column("int")
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrdersProducts;
