import { MigrationInterface, QueryRunner } from 'typeorm';

export class Photo1719541863341 implements MigrationInterface {
  name = 'Photo1719541863341';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "temporary_photo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdDate" date NOT NULL DEFAULT (datetime(\'now\')), "updateDate" date NOT NULL DEFAULT (datetime(\'now\')), "title" varchar(100) NOT NULL, "description" text NOT NULL, "filename" varchar NOT NULL, "views" double NOT NULL, "isPublished" boolean NOT NULL, "authorId" integer, CONSTRAINT "FK_c073d197b41cfbeb09835ca233c" FOREIGN KEY ("authorId") REFERENCES "author" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)'
    );
    await queryRunner.query(
      'INSERT INTO "temporary_photo"("id", "createdDate", "updateDate", "title", "description", "filename", "views", "isPublished", "authorId") SELECT "id", "createdDate", "updateDate", "name", "description", "filename", "views", "isPublished", "authorId" FROM "photo"'
    );
    await queryRunner.query('DROP TABLE "photo"');
    await queryRunner.query('ALTER TABLE "temporary_photo" RENAME TO "photo"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "photo" RENAME TO "temporary_photo"');
    await queryRunner.query(
      'CREATE TABLE "photo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdDate" date NOT NULL DEFAULT (datetime(\'now\')), "updateDate" date NOT NULL DEFAULT (datetime(\'now\')), "name" varchar(100) NOT NULL, "description" text NOT NULL, "filename" varchar NOT NULL, "views" double NOT NULL, "isPublished" boolean NOT NULL, "authorId" integer, CONSTRAINT "FK_c073d197b41cfbeb09835ca233c" FOREIGN KEY ("authorId") REFERENCES "author" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)'
    );
    await queryRunner.query(
      'INSERT INTO "photo"("id", "createdDate", "updateDate", "name", "description", "filename", "views", "isPublished", "authorId") SELECT "id", "createdDate", "updateDate", "title", "description", "filename", "views", "isPublished", "authorId" FROM "temporary_photo"'
    );
    await queryRunner.query('DROP TABLE "temporary_photo"');
  }
}
