import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "srs_logs"
      ADD COLUMN IF NOT EXISTS "email" varchar,
      ADD COLUMN IF NOT EXISTS "answers" jsonb,
      ADD COLUMN IF NOT EXISTS "form_data_pain" varchar,
      ADD COLUMN IF NOT EXISTS "form_data_root" varchar,
      ADD COLUMN IF NOT EXISTS "form_data_vision" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "srs_logs"
      DROP COLUMN IF EXISTS "email",
      DROP COLUMN IF EXISTS "answers",
      DROP COLUMN IF EXISTS "form_data_pain",
      DROP COLUMN IF EXISTS "form_data_root",
      DROP COLUMN IF EXISTS "form_data_vision";
  `)
}
