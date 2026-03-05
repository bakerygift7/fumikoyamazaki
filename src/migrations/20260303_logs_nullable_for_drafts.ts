import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// drafts (autosave) が空のドキュメントを保存するため、
// required フィールドの NOT NULL 制約をDBレベルでは解除する。
// Payload の required バリデーションは公開時に適用される。
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "logs" ALTER COLUMN "title" DROP NOT NULL;`)
  await db.execute(sql`ALTER TABLE "logs" ALTER COLUMN "slug" DROP NOT NULL;`)
  await db.execute(sql`ALTER TABLE "logs" ALTER COLUMN "date" DROP NOT NULL;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "logs" ALTER COLUMN "title" SET NOT NULL;`)
  await db.execute(sql`ALTER TABLE "logs" ALTER COLUMN "slug" SET NOT NULL;`)
  await db.execute(sql`ALTER TABLE "logs" ALTER COLUMN "date" SET NOT NULL;`)
}
