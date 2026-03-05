import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // media コレクションテーブル作成
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "media" (
      "id" serial PRIMARY KEY NOT NULL,
      "alt" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "url" varchar,
      "thumbnail_u_r_l" varchar,
      "filename" varchar,
      "mime_type" varchar,
      "filesize" numeric,
      "width" numeric,
      "height" numeric,
      "focal_x" numeric,
      "focal_y" numeric,
      "sizes_ogp_url" varchar,
      "sizes_ogp_width" numeric,
      "sizes_ogp_height" numeric,
      "sizes_ogp_mime_type" varchar,
      "sizes_ogp_filesize" numeric,
      "sizes_ogp_filename" varchar,
      "sizes_thumbnail_url" varchar,
      "sizes_thumbnail_width" numeric,
      "sizes_thumbnail_height" numeric,
      "sizes_thumbnail_mime_type" varchar,
      "sizes_thumbnail_filesize" numeric,
      "sizes_thumbnail_filename" varchar
    );
  `)

  // about: ogp_image_url (text) を削除して ogp_image_id (FK) を追加
  await db.execute(sql`ALTER TABLE "about" DROP COLUMN IF EXISTS "ogp_image_url";`)
  await db.execute(sql`ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "ogp_image_id" integer REFERENCES "media"("id");`)

  // mission
  await db.execute(sql`ALTER TABLE "mission" DROP COLUMN IF EXISTS "ogp_image_url";`)
  await db.execute(sql`ALTER TABLE "mission" ADD COLUMN IF NOT EXISTS "ogp_image_id" integer REFERENCES "media"("id");`)

  // privacy
  await db.execute(sql`ALTER TABLE "privacy" DROP COLUMN IF EXISTS "ogp_image_url";`)
  await db.execute(sql`ALTER TABLE "privacy" ADD COLUMN IF NOT EXISTS "ogp_image_id" integer REFERENCES "media"("id");`)

  // legal
  await db.execute(sql`ALTER TABLE "legal" DROP COLUMN IF EXISTS "ogp_image_url";`)
  await db.execute(sql`ALTER TABLE "legal" ADD COLUMN IF NOT EXISTS "ogp_image_id" integer REFERENCES "media"("id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "about" DROP COLUMN IF EXISTS "ogp_image_id";`)
  await db.execute(sql`ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "ogp_image_url" varchar;`)

  await db.execute(sql`ALTER TABLE "mission" DROP COLUMN IF EXISTS "ogp_image_id";`)
  await db.execute(sql`ALTER TABLE "mission" ADD COLUMN IF NOT EXISTS "ogp_image_url" varchar;`)

  await db.execute(sql`ALTER TABLE "privacy" DROP COLUMN IF EXISTS "ogp_image_id";`)
  await db.execute(sql`ALTER TABLE "privacy" ADD COLUMN IF NOT EXISTS "ogp_image_url" varchar;`)

  await db.execute(sql`ALTER TABLE "legal" DROP COLUMN IF EXISTS "ogp_image_id";`)
  await db.execute(sql`ALTER TABLE "legal" ADD COLUMN IF NOT EXISTS "ogp_image_url" varchar;`)

  await db.execute(sql`DROP TABLE IF EXISTS "media";`)
}
