import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Users1708985068309 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "first_name",
                        type: "varchar",
                        length: "255",
                        isNullable: false
                    },
                    {
                        name: "last_name",
                        type: "varchar",
                        length: "255",
                        isNullable: false
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "255",
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: "password_hash",
                        type: "varchar",
                        length: "255",
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: "role_id",
                        type: "int  ",
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                        onUpdate: "now()"
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["role_id"],
                        referencedTableName: "role",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    }, 
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
