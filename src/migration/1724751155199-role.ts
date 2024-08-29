import { MigrationInterface, QueryRunner } from 'typeorm';

export class Role1724751155199 implements MigrationInterface {
  name = 'Role1724751155199';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `role` ADD `description` varchar(255) NOT NULL COMMENT '角色描述'"
    );
    await queryRunner.query(
      "ALTER TABLE `role` ADD `administrator` tinyint NOT NULL COMMENT '是否为超级管理员' DEFAULT 0"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `role` DROP COLUMN `administrator`');
    await queryRunner.query('ALTER TABLE `role` DROP COLUMN `description`');
  }
}
