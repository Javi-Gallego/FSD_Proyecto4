import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Catalog1709229074383 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "catalog",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "tattoo_name",
                        type: "varchar",
                        length: "255",
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: "url_image",
                        type: "varchar",
                        length: "255",
                        isUnique: true,
                        isNullable: false
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("catalog")
    }

}
