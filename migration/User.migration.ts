import {MigrationInterface} from "typeorm";
import {QueryRunner} from "typeorm";

export class UserMigration implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE IF EXISTS USERS;\n" +
            "CREATE TABLE USERS (\n" +
            "  id int(11) NOT NULL AUTO_INCREMENT,\n" +
            "  created_at datetime NOT NULL,\n" +
            "  updated_at datetime NOT NULL,\n" +
            "  email varchar(50) NOT NULL,\n" +
            "  PRIMARY KEY (id)\n" +
            ") ENGINE=InnoDB DEFAULT CHARSET=utf8;");
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE IF EXISTS USERS");
    }
}
