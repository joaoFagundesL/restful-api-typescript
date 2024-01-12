import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddOrderIdToOrdersProducts1705071730720
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "orders_products",
      new TableColumn({
        name: "order_id",
        type: "int",
        isNullable: true /* cliente removido de um pedido */,
      }),
    );

    await queryRunner.createForeignKey(
      "orders_products",
      new TableForeignKey({
        name: "OrdersProductsOrder",
        columnNames: ["order_id"],
        referencedTableName: "orders",
        referencedColumnNames: ["id"],
        onDelete:
          "SET NULL" /* campo customer_id fica nulo mas as outras informacoes continuam */,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("orders_products", "OrdersProductsOrder");
    await queryRunner.dropColumn("orders_products", "order_id");
  }
}
