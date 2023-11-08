import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;
}

export default User;
