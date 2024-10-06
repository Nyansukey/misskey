/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class Cat1728219228305 {
	constructor() {
			this.name = 'Cat1728219228305';
	}
	async up(queryRunner) {
			await queryRunner.query(`ALTER TABLE "user" ADD "outerEarColor" varchar(6)`);
			await queryRunner.query(`ALTER TABLE "user" ADD "innerEarColor" varchar(6) NOT NULL DEFAULT 'df548f'`);

			await queryRunner.query(`ALTER TABLE "user" ADD "speakAsCat" boolean NOT NULL DEFAULT true`);
			await queryRunner.query(`COMMENT ON COLUMN "user"."speakAsCat" IS 'Whether to speak as a cat if chosen.'`);
	}
	async down(queryRunner) {
			await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "outerEarColor"`);
			await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "innerEarColor"`);
			await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "speakAsCat"`);
	}
}
