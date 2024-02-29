import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Role1708984735981 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "role",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "40",
                        isUnique: true,
                        isNullable: false
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("role");
    }

}
