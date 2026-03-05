import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // media テーブルに不足しているカラムを追加
  await db.execute(sql`ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "alt" varchar;`)
  await db.execute(sql`ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "url" varchar;`)
  await db.execute(sql`ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "thumbnail_u_r_l" varchar;`)
  await db.execute(sql`ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "filename" varchar;`)
  await db.execute(sql`ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "mime_type" varchar;`)
  await db.execute(sql`ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "filesize" numeric;`)
  await db.execute(sql`ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "width" numeric;`)
  await db.execute(sql`ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "height" numeric;`)
  await db.execute(sql`ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "focal_x" numeric;`)
  await db.execute(sql`ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "focal_y" numeric;`)

  // OGP サイズカラム
  await db.execute(sql`ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_ogp_url" varchar;`)
  await db.execute(sql`ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_ogp_width" numeric;`)
  await db.execute(sql`ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_ogp_height" numeric;`)
  await db.execute(sql`ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_ogp_mime_type" varchar;`)
  await db.execute(sql`ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_ogp_filesize" numeric;`)
  await db.execute(sql`ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_ogp_filename" varchar;`)

  // thumbnail サイズカラム
  await db.execute(sql`ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_url" varchar;`)
  await db.execute(sql`ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_width" numeric;`)
  await db.execute(sql`ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_height" numeric;`)
  await db.execute(sql`ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_mime_type" varchar;`)
  await db.execute(sql`ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_filesize" numeric;`)
  await db.execute(sql`ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_filename" varchar;`)

  // unique index for filename
  await db.execute(sql`
    DO $$ BEGIN
      CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
    EXCEPTION WHEN duplicate_table THEN NULL; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_ogp_url";`)
  await db.execute(sql`ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_ogp_width";`)
  await db.execute(sql`ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_ogp_height";`)
  await db.execute(sql`ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_ogp_mime_type";`)
  await db.execute(sql`ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_ogp_filesize";`)
  await db.execute(sql`ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_ogp_filename";`)
  await db.execute(sql`ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_url";`)
  await db.execute(sql`ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_width";`)
  await db.execute(sql`ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_height";`)
  await db.execute(sql`ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_mime_type";`)
  await db.execute(sql`ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_filesize";`)
  await db.execute(sql`ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_filename";`)
}
