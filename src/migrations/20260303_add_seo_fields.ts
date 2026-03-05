import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // about グローバルにSEOフィールド追加
  await db.execute(sql`ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "seo_title" varchar;`)
  await db.execute(sql`ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "seo_description" varchar;`)
  await db.execute(sql`ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "ogp_image_url" varchar;`)

  // mission グローバルにSEOフィールド追加
  await db.execute(sql`ALTER TABLE "mission" ADD COLUMN IF NOT EXISTS "seo_title" varchar;`)
  await db.execute(sql`ALTER TABLE "mission" ADD COLUMN IF NOT EXISTS "seo_description" varchar;`)
  await db.execute(sql`ALTER TABLE "mission" ADD COLUMN IF NOT EXISTS "ogp_image_url" varchar;`)

  // privacy グローバルにSEOフィールド追加
  await db.execute(sql`ALTER TABLE "privacy" ADD COLUMN IF NOT EXISTS "seo_title" varchar;`)
  await db.execute(sql`ALTER TABLE "privacy" ADD COLUMN IF NOT EXISTS "seo_description" varchar;`)
  await db.execute(sql`ALTER TABLE "privacy" ADD COLUMN IF NOT EXISTS "ogp_image_url" varchar;`)

  // legal グローバルにSEOフィールド追加
  await db.execute(sql`ALTER TABLE "legal" ADD COLUMN IF NOT EXISTS "seo_title" varchar;`)
  await db.execute(sql`ALTER TABLE "legal" ADD COLUMN IF NOT EXISTS "seo_description" varchar;`)
  await db.execute(sql`ALTER TABLE "legal" ADD COLUMN IF NOT EXISTS "ogp_image_url" varchar;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "about" DROP COLUMN IF EXISTS "seo_title";`)
  await db.execute(sql`ALTER TABLE "about" DROP COLUMN IF EXISTS "seo_description";`)
  await db.execute(sql`ALTER TABLE "about" DROP COLUMN IF EXISTS "ogp_image_url";`)

  await db.execute(sql`ALTER TABLE "mission" DROP COLUMN IF EXISTS "seo_title";`)
  await db.execute(sql`ALTER TABLE "mission" DROP COLUMN IF EXISTS "seo_description";`)
  await db.execute(sql`ALTER TABLE "mission" DROP COLUMN IF EXISTS "ogp_image_url";`)

  await db.execute(sql`ALTER TABLE "privacy" DROP COLUMN IF EXISTS "seo_title";`)
  await db.execute(sql`ALTER TABLE "privacy" DROP COLUMN IF EXISTS "seo_description";`)
  await db.execute(sql`ALTER TABLE "privacy" DROP COLUMN IF EXISTS "ogp_image_url";`)

  await db.execute(sql`ALTER TABLE "legal" DROP COLUMN IF EXISTS "seo_title";`)
  await db.execute(sql`ALTER TABLE "legal" DROP COLUMN IF EXISTS "seo_description";`)
  await db.execute(sql`ALTER TABLE "legal" DROP COLUMN IF EXISTS "ogp_image_url";`)
}
