import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "kanako_chat_logs" (
      "id" serial PRIMARY KEY NOT NULL,
      "user_id" varchar,
      "display_name" varchar,
      "user_message" varchar,
      "kanako_reply" varchar,
      "rag_used" boolean DEFAULT false,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "kanako_chat_logs";`)
}
