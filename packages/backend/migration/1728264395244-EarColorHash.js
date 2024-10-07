/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class EarColorHash1728264395244 {
	constructor() {
			this.name = 'EarColorHash1728264395244';
	}
	async up(queryRunner) {
			await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "outerEarColor" TYPE varchar(16)`);
			await queryRunner.query(`UPDATE "user" SET "outerEarColor" = CONCAT('#', "outerEarColor") WHERE "outerEarColor" NOT LIKE '#%'`);
			await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "innerEarColor" TYPE varchar(16)`);
			await queryRunner.query(`UPDATE "user" SET "innerEarColor" = CONCAT('#', "innerEarColor") WHERE "innerEarColor" NOT LIKE '#%'`);

	}
	async down(queryRunner) {
		await queryRunner.query(`UPDATE "user" SET "outerEarColor" = SUBSTRING("outerEarColor" FROM 2) WHERE "outerEarColor" LIKE '#%'`)
		await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "outerEarColor" TYPE varchar(6)`);
		await queryRunner.query(`UPDATE "user" SET "innerEarColor" = SUBSTRING("innerEarColor" FROM 2) WHERE "innerEarColor" LIKE '#%'`)
		await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "innerEarColor" TYPE varchar(6)`);
	}
}
