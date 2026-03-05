import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // privacy global table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "privacy" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "subtitle" varchar,
      "content" jsonb,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
  `)

  // legal global table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "legal" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "subtitle" varchar,
      "content" jsonb,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "privacy";`)
  await db.execute(sql`DROP TABLE IF EXISTS "legal";`)
}
