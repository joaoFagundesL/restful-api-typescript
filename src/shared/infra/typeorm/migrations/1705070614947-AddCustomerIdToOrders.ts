import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

/* aqui a migration vai apenas adicionar a fk customer_id na tabela orders. Foi feito
 * de forma separada criando outra migration */

/* Ainda é preciso configurar depois o arquivo Order.ts com essa chave fk
 * que foi criada */

export class AddCustomerIdToOrders1705070614947 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "orders",
      new TableColumn({
        name: "customer_id",
        type: "int",
        isNullable: true /* cliente removido de um pedido */,
      }),
    );

    await queryRunner.createForeignKey(
      "orders",
      new TableForeignKey({
        name: "OrdersCustomer",
        columnNames: ["customer_id"],
        referencedTableName: "customers",
        referencedColumnNames: ["id"],
        onDelete:
          "SET NULL" /* campo customer_id fica nulo mas as outras informacoes continuam */,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("orders", "OrdersCustomer");
    await queryRunner.dropColumn("orders", "customer_id");
  }
}
