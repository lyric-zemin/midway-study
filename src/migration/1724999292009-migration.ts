import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724999292009 implements MigrationInterface {
  name = 'Migration1724999292009';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX `IDX_176fd840a9112bdb132e006e6c` ON `cool`'
    );
    await queryRunner.query(
      'DROP INDEX `IDX_9f14ab08cc4241d940ccba332a` ON `cool`'
    );
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `createdDate`');
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `updateDate`');
    await queryRunner.query('ALTER TABLE `role` DROP COLUMN `createdDate`');
    await queryRunner.query('ALTER TABLE `role` DROP COLUMN `updateDate`');
    await queryRunner.query(
      "ALTER TABLE `user` ADD `createTime` datetime(6) NOT NULL COMMENT '创建日期' DEFAULT CURRENT_TIMESTAMP(6)"
    );
    await queryRunner.query(
      "ALTER TABLE `user` ADD `updateTime` datetime(6) NOT NULL COMMENT '更新日期' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)"
    );
    await queryRunner.query(
      "ALTER TABLE `user` ADD `deleteTime` datetime(6) NULL COMMENT '软删除日期'"
    );
    await queryRunner.query(
      "ALTER TABLE `role` ADD `createTime` datetime(6) NOT NULL COMMENT '创建日期' DEFAULT CURRENT_TIMESTAMP(6)"
    );
    await queryRunner.query(
      "ALTER TABLE `role` ADD `updateTime` datetime(6) NOT NULL COMMENT '更新日期' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)"
    );
    await queryRunner.query(
      "ALTER TABLE `role` ADD `deleteTime` datetime(6) NULL COMMENT '软删除日期'"
    );
    await queryRunner.query(
      "ALTER TABLE `cool` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT COMMENT '自增键'"
    );
    await queryRunner.query(
      "ALTER TABLE `cool` CHANGE `createTime` `createTime` datetime(6) NOT NULL COMMENT '创建日期' DEFAULT CURRENT_TIMESTAMP(6)"
    );
    await queryRunner.query(
      "ALTER TABLE `cool` CHANGE `updateTime` `updateTime` datetime(6) NOT NULL COMMENT '更新日期' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)"
    );
    await queryRunner.query(
      "ALTER TABLE `cool` CHANGE `deleteTime` `deleteTime` datetime(6) NULL COMMENT '软删除日期'"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `cool` CHANGE `deleteTime` `deleteTime` datetime(6) NULL'
    );
    await queryRunner.query(
      "ALTER TABLE `cool` CHANGE `updateTime` `updateTime` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)"
    );
    await queryRunner.query(
      "ALTER TABLE `cool` CHANGE `createTime` `createTime` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6)"
    );
    await queryRunner.query(
      "ALTER TABLE `cool` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID'"
    );
    await queryRunner.query('ALTER TABLE `role` DROP COLUMN `deleteTime`');
    await queryRunner.query('ALTER TABLE `role` DROP COLUMN `updateTime`');
    await queryRunner.query('ALTER TABLE `role` DROP COLUMN `createTime`');
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `deleteTime`');
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `updateTime`');
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `createTime`');
    await queryRunner.query(
      "ALTER TABLE `role` ADD `updateDate` timestamp(6) NOT NULL COMMENT '更新日期' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)"
    );
    await queryRunner.query(
      "ALTER TABLE `role` ADD `createdDate` timestamp(6) NOT NULL COMMENT '创建日期' DEFAULT CURRENT_TIMESTAMP(6)"
    );
    await queryRunner.query(
      "ALTER TABLE `user` ADD `updateDate` timestamp(6) NOT NULL COMMENT '更新日期' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)"
    );
    await queryRunner.query(
      "ALTER TABLE `user` ADD `createdDate` timestamp(6) NOT NULL COMMENT '创建日期' DEFAULT CURRENT_TIMESTAMP(6)"
    );
    await queryRunner.query(
      'CREATE INDEX `IDX_9f14ab08cc4241d940ccba332a` ON `cool` (`createTime`)'
    );
    await queryRunner.query(
      'CREATE INDEX `IDX_176fd840a9112bdb132e006e6c` ON `cool` (`updateTime`)'
    );
  }
}
