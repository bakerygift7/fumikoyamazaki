import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // image_url (text) を削除して cover_image_id (FK) を追加
  await db.execute(sql`ALTER TABLE "logs" DROP COLUMN IF EXISTS "image_url";`)
  await db.execute(sql`ALTER TABLE "logs" ADD COLUMN IF NOT EXISTS "cover_image_id" integer REFERENCES "media"("id");`)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "logs_cover_image_id_idx" ON "logs" USING btree ("cover_image_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP INDEX IF EXISTS "logs_cover_image_id_idx";`)
  await db.execute(sql`ALTER TABLE "logs" DROP COLUMN IF EXISTS "cover_image_id";`)
  await db.execute(sql`ALTER TABLE "logs" ADD COLUMN IF NOT EXISTS "image_url" varchar;`)
}
