import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTable1683474192965 implements MigrationInterface {
  name = 'CreateTable1683474192965';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "item" ("id" SERIAL NOT NULL, "author" character varying(100) NOT NULL, "title" character varying(255) NOT NULL, "price" numeric(10,2) NOT NULL, "category" character varying(100) NOT NULL, "createAt" date NOT NULL DEFAULT now(), "updateAt" date NOT NULL DEFAULT now(), CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "item"`);
  }
}
