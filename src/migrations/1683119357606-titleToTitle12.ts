import { MigrationInterface, QueryRunner } from 'typeorm';

export class TitleToTitle121683119357606 implements MigrationInterface {
  name = 'TitleToTitle121683119357606';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "item" RENAME COLUMN "title" TO "title12"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "item" RENAME COLUMN "title12" TO "title"`,
    );
  }
}
