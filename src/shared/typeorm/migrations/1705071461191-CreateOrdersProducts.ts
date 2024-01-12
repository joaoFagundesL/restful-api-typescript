import { MigrationInterface, QueryRunner, Table } from "typeorm";

/* 1 order tem varios produtos e um produto pode estar em varias orders */

/* as chaves fk vao ser criadas em outras migrations */

export class CreateOrdersProducts1705071461191 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "orders_products",
        columns: [
          {
            name: "id",
            type: "int",
            isGenerated: true,
            isPrimary: true,
            generationStrategy: "increment",
          },

          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },

          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable("orders_products");
  }
}
