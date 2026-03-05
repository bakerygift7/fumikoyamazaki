import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`

    DO $$ BEGIN CREATE TYPE "public"."enum_chat_access_access_type" AS ENUM('trial', 'paid');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN CREATE TYPE "public"."enum_contacts_status" AS ENUM('new', 'in_progress', 'completed');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN CREATE TYPE "public"."enum_ai_drafts_status" AS ENUM('pending', 'completed', 'error');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN CREATE TYPE "public"."enum_srs_questions_category" AS ENUM('thinker', 'persister', 'harmonizer', 'imaginer', 'rebel', 'promoter');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN CREATE TYPE "public"."enum_srs_types_pcm_base" AS ENUM('thinker', 'persister', 'harmonizer', 'imaginer', 'rebel', 'promoter');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

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

    CREATE TABLE IF NOT EXISTS "chat_access" (
      "id" serial PRIMARY KEY NOT NULL,
      "display_name" varchar,
      "line_user_id" varchar NOT NULL,
      "access_type" "enum_chat_access_access_type" DEFAULT 'trial',
      "trial_started_at" timestamp(3) with time zone,
      "paid_started_at" timestamp(3) with time zone,
      "paid_until" timestamp(3) with time zone,
      "daily_count" numeric DEFAULT 0,
      "last_count_reset" timestamp(3) with time zone,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "logs" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "date" timestamp(3) with time zone NOT NULL,
      "author" varchar DEFAULT '倉地 類人',
      "category" varchar DEFAULT '千の顔を持つ英雄',
      "description" varchar,
      "image_url" varchar,
      "note_url" varchar,
      "video_url" varchar,
      "content" jsonb,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "news" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "published_at" timestamp(3) with time zone NOT NULL,
      "link" varchar,
      "is_urgent" boolean DEFAULT false,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "contacts" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar,
      "email" varchar,
      "subject" varchar,
      "message" varchar,
      "status" "enum_contacts_status" DEFAULT 'new',
      "received_at" timestamp(3) with time zone,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "ai_drafts" (
      "id" serial PRIMARY KEY NOT NULL,
      "note_url" varchar,
      "raw_text" varchar,
      "raw_transcript" varchar,
      "status" "enum_ai_drafts_status" DEFAULT 'pending',
      "generated_content" jsonb,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "srs_questions" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" numeric NOT NULL,
      "text" varchar NOT NULL,
      "category" "enum_srs_questions_category" NOT NULL,
      "weight" numeric DEFAULT 1,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "srs_types_strengths" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "item" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "srs_types_weaknesses" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "item" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "srs_types" (
      "id" serial PRIMARY KEY NOT NULL,
      "code" varchar NOT NULL,
      "name" varchar NOT NULL,
      "catchphrase" varchar,
      "description" jsonb,
      "ultra_c" varchar,
      "image_url" varchar,
      "pcm_base" "enum_srs_types_pcm_base",
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "home" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar DEFAULT 'RUIHITO & KANAKO' NOT NULL,
      "subtitle" varchar DEFAULT 'OFFICIAL' NOT NULL,
      "slogan" varchar DEFAULT 'Unleash Your SRS Potential',
      "hero_description" varchar,
      "mission_button_text" varchar DEFAULT 'Read Mission',
      "note_rui_url" varchar,
      "note_kanako_url" varchar,
      "note_rui_text" varchar DEFAULT 'Ruihito Note',
      "note_kanako_text" varchar DEFAULT 'Kanako Note',
      "architects_title" varchar DEFAULT 'Architects',
      "architects_description" varchar,
      "rui_profile" varchar,
      "kanako_profile" varchar,
      "content" jsonb,
      "seo_title" varchar,
      "seo_description" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    CREATE TABLE IF NOT EXISTS "about_business_content" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "item" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "about_history" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "year" varchar NOT NULL,
      "event" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "about" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar DEFAULT '倉地類人加奈子 Official Website',
      "representatives" varchar DEFAULT '倉地 類人, 倉地 加奈子',
      "establishment" varchar DEFAULT '2024年2月',
      "location" varchar DEFAULT '東京都',
      "capital" varchar DEFAULT '非公開',
      "contact" varchar,
      "content" jsonb,
      "content_html" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    CREATE TABLE IF NOT EXISTS "mission_oath_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "mission" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar DEFAULT 'THE MISSION',
      "subtitle" varchar DEFAULT '社会への貢献意志',
      "description" varchar,
      "hero_description" varchar DEFAULT '道売り専用のやり方「ウルトラC」で人生を最短距離で書き換える。それがギフトの使命であり戦略である。',
      "will_title" varchar DEFAULT 'ミッションステートメント：SRSが高い人を世界中に増やす',
      "will_content" jsonb,
      "ultra_c_title" varchar DEFAULT '道売りという手法「ウルトラC（Ultra-C）」',
      "ultra_c_content" jsonb,
      "oath_title" varchar DEFAULT '私たちの誓い',
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    CREATE TABLE IF NOT EXISTS "site_settings" (
      "id" serial PRIMARY KEY NOT NULL,
      "site_title" varchar DEFAULT '倉地類人加奈子 Official Website',
      "contact_email" varchar,
      "reply_subject" varchar DEFAULT '【受領】メッセージを受け取りました',
      "reply_body" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    ALTER TABLE "srs_logs" ADD COLUMN IF NOT EXISTS "email" varchar;
    ALTER TABLE "srs_logs" ADD COLUMN IF NOT EXISTS "answers" jsonb;
    ALTER TABLE "srs_logs" ADD COLUMN IF NOT EXISTS "form_data_pain" varchar;
    ALTER TABLE "srs_logs" ADD COLUMN IF NOT EXISTS "form_data_root" varchar;
    ALTER TABLE "srs_logs" ADD COLUMN IF NOT EXISTS "form_data_vision" varchar;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "kanako_chat_logs_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "chat_access_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "logs_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "news_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "contacts_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "ai_drafts_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "srs_questions_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "srs_types_id" integer;

    ALTER TABLE "srs_types_strengths" DROP CONSTRAINT IF EXISTS "srs_types_strengths_parent_id_fk";
    ALTER TABLE "srs_types_strengths" ADD CONSTRAINT "srs_types_strengths_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."srs_types"("id") ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "srs_types_weaknesses" DROP CONSTRAINT IF EXISTS "srs_types_weaknesses_parent_id_fk";
    ALTER TABLE "srs_types_weaknesses" ADD CONSTRAINT "srs_types_weaknesses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."srs_types"("id") ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "about_business_content" DROP CONSTRAINT IF EXISTS "about_business_content_parent_id_fk";
    ALTER TABLE "about_business_content" ADD CONSTRAINT "about_business_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "about_history" DROP CONSTRAINT IF EXISTS "about_history_parent_id_fk";
    ALTER TABLE "about_history" ADD CONSTRAINT "about_history_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "mission_oath_items" DROP CONSTRAINT IF EXISTS "mission_oath_items_parent_id_fk";
    ALTER TABLE "mission_oath_items" ADD CONSTRAINT "mission_oath_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mission"("id") ON DELETE cascade ON UPDATE no action;

    CREATE INDEX IF NOT EXISTS "kanako_chat_logs_updated_at_idx" ON "kanako_chat_logs" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "kanako_chat_logs_created_at_idx" ON "kanako_chat_logs" USING btree ("created_at");
    CREATE UNIQUE INDEX IF NOT EXISTS "chat_access_line_user_id_idx" ON "chat_access" USING btree ("line_user_id");
    CREATE INDEX IF NOT EXISTS "chat_access_updated_at_idx" ON "chat_access" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "chat_access_created_at_idx" ON "chat_access" USING btree ("created_at");
    CREATE UNIQUE INDEX IF NOT EXISTS "logs_slug_idx" ON "logs" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "logs_updated_at_idx" ON "logs" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "logs_created_at_idx" ON "logs" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "news_updated_at_idx" ON "news" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "news_created_at_idx" ON "news" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "contacts_updated_at_idx" ON "contacts" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "contacts_created_at_idx" ON "contacts" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "ai_drafts_updated_at_idx" ON "ai_drafts" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "ai_drafts_created_at_idx" ON "ai_drafts" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "srs_questions_updated_at_idx" ON "srs_questions" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "srs_questions_created_at_idx" ON "srs_questions" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "srs_types_strengths_order_idx" ON "srs_types_strengths" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "srs_types_strengths_parent_id_idx" ON "srs_types_strengths" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "srs_types_weaknesses_order_idx" ON "srs_types_weaknesses" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "srs_types_weaknesses_parent_id_idx" ON "srs_types_weaknesses" USING btree ("_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "srs_types_code_idx" ON "srs_types" USING btree ("code");
    CREATE INDEX IF NOT EXISTS "srs_types_updated_at_idx" ON "srs_types" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "srs_types_created_at_idx" ON "srs_types" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "about_business_content_order_idx" ON "about_business_content" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "about_business_content_parent_id_idx" ON "about_business_content" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "about_history_order_idx" ON "about_history" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "about_history_parent_id_idx" ON "about_history" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "mission_oath_items_order_idx" ON "mission_oath_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "mission_oath_items_parent_id_idx" ON "mission_oath_items" USING btree ("_parent_id");

    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_kanako_chat_logs_fk";
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_kanako_chat_logs_fk" FOREIGN KEY ("kanako_chat_logs_id") REFERENCES "public"."kanako_chat_logs"("id") ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_chat_access_fk";
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_chat_access_fk" FOREIGN KEY ("chat_access_id") REFERENCES "public"."chat_access"("id") ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_logs_fk";
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_logs_fk" FOREIGN KEY ("logs_id") REFERENCES "public"."logs"("id") ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_news_fk";
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_contacts_fk";
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contacts_fk" FOREIGN KEY ("contacts_id") REFERENCES "public"."contacts"("id") ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_ai_drafts_fk";
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ai_drafts_fk" FOREIGN KEY ("ai_drafts_id") REFERENCES "public"."ai_drafts"("id") ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_srs_questions_fk";
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_srs_questions_fk" FOREIGN KEY ("srs_questions_id") REFERENCES "public"."srs_questions"("id") ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_srs_types_fk";
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_srs_types_fk" FOREIGN KEY ("srs_types_id") REFERENCES "public"."srs_types"("id") ON DELETE cascade ON UPDATE no action;

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_kanako_chat_logs_id_idx" ON "payload_locked_documents_rels" USING btree ("kanako_chat_logs_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_chat_access_id_idx" ON "payload_locked_documents_rels" USING btree ("chat_access_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_logs_id_idx" ON "payload_locked_documents_rels" USING btree ("logs_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_contacts_id_idx" ON "payload_locked_documents_rels" USING btree ("contacts_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_ai_drafts_id_idx" ON "payload_locked_documents_rels" USING btree ("ai_drafts_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_srs_questions_id_idx" ON "payload_locked_documents_rels" USING btree ("srs_questions_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_srs_types_id_idx" ON "payload_locked_documents_rels" USING btree ("srs_types_id");

  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "kanako_chat_logs" CASCADE;
    DROP TABLE IF EXISTS "chat_access" CASCADE;
    DROP TABLE IF EXISTS "logs" CASCADE;
    DROP TABLE IF EXISTS "news" CASCADE;
    DROP TABLE IF EXISTS "contacts" CASCADE;
    DROP TABLE IF EXISTS "ai_drafts" CASCADE;
    DROP TABLE IF EXISTS "srs_questions" CASCADE;
    DROP TABLE IF EXISTS "srs_types_strengths" CASCADE;
    DROP TABLE IF EXISTS "srs_types_weaknesses" CASCADE;
    DROP TABLE IF EXISTS "srs_types" CASCADE;
    DROP TABLE IF EXISTS "home" CASCADE;
    DROP TABLE IF EXISTS "about_business_content" CASCADE;
    DROP TABLE IF EXISTS "about_history" CASCADE;
    DROP TABLE IF EXISTS "about" CASCADE;
    DROP TABLE IF EXISTS "mission_oath_items" CASCADE;
    DROP TABLE IF EXISTS "mission" CASCADE;
    DROP TABLE IF EXISTS "site_settings" CASCADE;
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "kanako_chat_logs_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "chat_access_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "logs_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "news_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "contacts_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "ai_drafts_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "srs_questions_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "srs_types_id";
    ALTER TABLE "srs_logs" DROP COLUMN IF EXISTS "email";
    ALTER TABLE "srs_logs" DROP COLUMN IF EXISTS "answers";
    ALTER TABLE "srs_logs" DROP COLUMN IF EXISTS "form_data_pain";
    ALTER TABLE "srs_logs" DROP COLUMN IF EXISTS "form_data_root";
    ALTER TABLE "srs_logs" DROP COLUMN IF EXISTS "form_data_vision";
    DROP TYPE IF EXISTS "public"."enum_chat_access_access_type";
    DROP TYPE IF EXISTS "public"."enum_contacts_status";
    DROP TYPE IF EXISTS "public"."enum_ai_drafts_status";
    DROP TYPE IF EXISTS "public"."enum_srs_questions_category";
    DROP TYPE IF EXISTS "public"."enum_srs_types_pcm_base";
  `)
}
