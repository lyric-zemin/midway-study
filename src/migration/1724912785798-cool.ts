import { MigrationInterface, QueryRunner } from 'typeorm';

export class Cool1724912785798 implements MigrationInterface {
  name = 'Cool1724912785798';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `cool` (`id` int NOT NULL AUTO_INCREMENT COMMENT 'ID', `createTime` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), `updateTime` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `month` varchar(7) AS (DATE_FORMAT(createTime, '%Y-%m')) VIRTUAL NOT NULL COMMENT '月份', `year` varchar(4) AS (DATE_FORMAT(createTime, '%Y')) VIRTUAL NOT NULL COMMENT '年份', `date` varchar(10) AS (DATE_FORMAT(createTime, '%Y-%m-%d')) VIRTUAL NOT NULL COMMENT '日期', `refund` json NULL COMMENT '退款', `refundStatus` int AS (JSON_EXTRACT(refund, '$.status')) VIRTUAL NULL COMMENT '退款状态', INDEX `IDX_9f14ab08cc4241d940ccba332a` (`createTime`), INDEX `IDX_176fd840a9112bdb132e006e6c` (`updateTime`), INDEX `IDX_9df62b855567912337428f9088` (`month`), INDEX `IDX_6db2bfc0204f5a8cbd45309941` (`year`), INDEX `IDX_7a73650811a0bc6f7ab26b35be` (`date`), INDEX `IDX_53c1319076356bfce7db1c0160` (`refundStatus`), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      'INSERT INTO `midway`.`typeorm_metadata`(`database`, `schema`, `table`, `type`, `name`, `value`) VALUES (DEFAULT, ?, ?, ?, ?, ?)',
      [
        'midway',
        'cool',
        'GENERATED_COLUMN',
        'month',
        "DATE_FORMAT(createTime, '%Y-%m')",
      ]
    );
    await queryRunner.query(
      'INSERT INTO `midway`.`typeorm_metadata`(`database`, `schema`, `table`, `type`, `name`, `value`) VALUES (DEFAULT, ?, ?, ?, ?, ?)',
      [
        'midway',
        'cool',
        'GENERATED_COLUMN',
        'year',
        "DATE_FORMAT(createTime, '%Y')",
      ]
    );
    await queryRunner.query(
      'INSERT INTO `midway`.`typeorm_metadata`(`database`, `schema`, `table`, `type`, `name`, `value`) VALUES (DEFAULT, ?, ?, ?, ?, ?)',
      [
        'midway',
        'cool',
        'GENERATED_COLUMN',
        'date',
        "DATE_FORMAT(createTime, '%Y-%m-%d')",
      ]
    );
    await queryRunner.query(
      'INSERT INTO `midway`.`typeorm_metadata`(`database`, `schema`, `table`, `type`, `name`, `value`) VALUES (DEFAULT, ?, ?, ?, ?, ?)',
      [
        'midway',
        'cool',
        'GENERATED_COLUMN',
        'refundStatus',
        "JSON_EXTRACT(refund, '$.status')",
      ]
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DELETE FROM `midway`.`typeorm_metadata` WHERE `type` = ? AND `name` = ? AND `schema` = ? AND `table` = ?',
      ['GENERATED_COLUMN', 'refundStatus', 'midway', 'cool']
    );
    await queryRunner.query(
      'DELETE FROM `midway`.`typeorm_metadata` WHERE `type` = ? AND `name` = ? AND `schema` = ? AND `table` = ?',
      ['GENERATED_COLUMN', 'date', 'midway', 'cool']
    );
    await queryRunner.query(
      'DELETE FROM `midway`.`typeorm_metadata` WHERE `type` = ? AND `name` = ? AND `schema` = ? AND `table` = ?',
      ['GENERATED_COLUMN', 'year', 'midway', 'cool']
    );
    await queryRunner.query(
      'DELETE FROM `midway`.`typeorm_metadata` WHERE `type` = ? AND `name` = ? AND `schema` = ? AND `table` = ?',
      ['GENERATED_COLUMN', 'month', 'midway', 'cool']
    );
    await queryRunner.query(
      'DROP INDEX `IDX_53c1319076356bfce7db1c0160` ON `cool`'
    );
    await queryRunner.query(
      'DROP INDEX `IDX_7a73650811a0bc6f7ab26b35be` ON `cool`'
    );
    await queryRunner.query(
      'DROP INDEX `IDX_6db2bfc0204f5a8cbd45309941` ON `cool`'
    );
    await queryRunner.query(
      'DROP INDEX `IDX_9df62b855567912337428f9088` ON `cool`'
    );
    await queryRunner.query(
      'DROP INDEX `IDX_176fd840a9112bdb132e006e6c` ON `cool`'
    );
    await queryRunner.query(
      'DROP INDEX `IDX_9f14ab08cc4241d940ccba332a` ON `cool`'
    );
    await queryRunner.query('DROP TABLE `cool`');
  }
}
