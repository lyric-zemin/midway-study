import { MigrationInterface, QueryRunner } from 'typeorm';

export class Cool1724997243587 implements MigrationInterface {
  name = 'Cool1724997243587';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `cool` ADD `deleteTime` datetime(6) NULL'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `cool` DROP COLUMN `deleteTime`');
  }
}
