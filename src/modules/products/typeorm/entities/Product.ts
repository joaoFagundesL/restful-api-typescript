import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("products")
class Product {
  @PrimaryGeneratedColumn("increment")
  id: number;
  name: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export default Product;
