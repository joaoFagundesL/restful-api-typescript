import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTokens1699662239332 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_tokens",
        columns: [
          {
            name: "id",
            type: "int",
            isGenerated: true,
            isPrimary: true,
            generationStrategy: "increment",
          },

          {
            name: "token",
            type: "uuid",
          },

          {
            name: "user_id",
            type: "int",
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
        foreignKeys: [
          {
            name: "TokenUser",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],

            /* se apagar o usuario o token tbm sera apagado */
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user_tokens");
  }
}
