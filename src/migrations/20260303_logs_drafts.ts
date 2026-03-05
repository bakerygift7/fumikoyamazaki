import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // --- enum types ---
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_logs__status" AS ENUM('draft', 'published');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum__logs_v_version__status" AS ENUM('draft', 'published');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `)

  // --- logsテーブルに _status / published_at を追加 ---
  await db.execute(sql`
    ALTER TABLE "logs"
      ADD COLUMN IF NOT EXISTS "_status" "enum_logs__status" DEFAULT 'draft',
      ADD COLUMN IF NOT EXISTS "published_at" timestamp;
  `)

  // --- バージョンテーブル作成 ---
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_logs_v" (
      "id"                        serial PRIMARY KEY,
      "parent_id"                 integer REFERENCES "logs"("id") ON DELETE SET NULL,
      "version_title"             varchar,
      "version_slug"              varchar,
      "version_date"              timestamp,
      "version_author"            varchar,
      "version_category"          varchar,
      "version_description"       varchar,
      "version_cover_image_id"    integer REFERENCES "media"("id") ON DELETE SET NULL,
      "version_note_url"          varchar,
      "version_video_url"         varchar,
      "version_content"           jsonb,
      "version__status"           "enum__logs_v_version__status" DEFAULT 'draft',
      "version_published_at"      timestamp,
      "latest"                    boolean DEFAULT true,
      "autosave"                  boolean DEFAULT false,
      "updated_at"                timestamp DEFAULT now() NOT NULL,
      "created_at"                timestamp DEFAULT now() NOT NULL
    );
  `)

  // --- バージョンリレーションテーブル ---
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_logs_v_rels" (
      "id"        serial PRIMARY KEY,
      "order"     integer,
      "parent_id" integer NOT NULL REFERENCES "_logs_v"("id") ON DELETE CASCADE,
      "path"      varchar NOT NULL,
      "media_id"  integer REFERENCES "media"("id") ON DELETE CASCADE
    );
  `)

  // --- インデックス ---
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "_logs_v_parent_id_idx" ON "_logs_v" USING btree ("parent_id");`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "_logs_v_version_slug_idx" ON "_logs_v" USING btree ("version_slug");`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "_logs_v_version__status_idx" ON "_logs_v" USING btree ("version__status");`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "_logs_v_latest_idx" ON "_logs_v" USING btree ("latest");`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "_logs_v_autosave_idx" ON "_logs_v" USING btree ("autosave");`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "_logs_v_rels_order_idx" ON "_logs_v_rels" USING btree ("order");`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "_logs_v_rels_parent_id_idx" ON "_logs_v_rels" USING btree ("parent_id");`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "_logs_v_rels_path_idx" ON "_logs_v_rels" USING btree ("path");`)

  // --- 既存レコードを published に設定 ---
  await db.execute(sql`UPDATE "logs" SET "_status" = 'published' WHERE "_status" IS NULL OR "_status" = 'draft';`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "_logs_v_rels";`)
  await db.execute(sql`DROP TABLE IF EXISTS "_logs_v";`)
  await db.execute(sql`ALTER TABLE "logs" DROP COLUMN IF EXISTS "_status";`)
  await db.execute(sql`ALTER TABLE "logs" DROP COLUMN IF EXISTS "published_at";`)
  await db.execute(sql`DROP TYPE IF EXISTS "public"."enum__logs_v_version__status";`)
  await db.execute(sql`DROP TYPE IF EXISTS "public"."enum_logs__status";`)
}
