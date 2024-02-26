import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class TattooArtists1708986294476 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tattoo_artists",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "first_name",
                        type: "varchar",
                        length: "255",
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: "last_name",
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
        await queryRunner.dropTable("tattoo_artists");
    }

}
