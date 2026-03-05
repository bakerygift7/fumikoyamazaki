import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Payload が要求する version_updated_at / version_created_at カラムを追加
  await db.execute(sql`
    ALTER TABLE "_logs_v"
      ADD COLUMN IF NOT EXISTS "version_updated_at" timestamp,
      ADD COLUMN IF NOT EXISTS "version_created_at" timestamp;
  `)

  // インデックス追加
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "_logs_v_version_updated_at_idx"
      ON "_logs_v" USING btree ("version_updated_at");
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "_logs_v_version_created_at_idx"
      ON "_logs_v" USING btree ("version_created_at");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP INDEX IF EXISTS "_logs_v_version_updated_at_idx";`)
  await db.execute(sql`DROP INDEX IF EXISTS "_logs_v_version_created_at_idx";`)
  await db.execute(sql`
    ALTER TABLE "_logs_v"
      DROP COLUMN IF EXISTS "version_updated_at",
      DROP COLUMN IF EXISTS "version_created_at";
  `)
}
