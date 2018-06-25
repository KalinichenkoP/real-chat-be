import {MigrationInterface} from "typeorm";
import {QueryRunner} from "typeorm";

export class UserMigration implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<any> {
        // await queryRunner.renameColumn("post", "title", "name");
        // alternatively you can do:
        // await queryRunner.query("CREATE TABLE `USER` ()");
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        // await queryRunner.renameColumn("post", "name", "title");
        // alternatively you can do:
        // await queryRunner.query("ALTER TABLE `post` CHANGE `name` `title` VARCHAR(255)");
    }
}
