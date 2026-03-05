import * as migration_20260225_011223_initial from './20260225_011223_initial';
import * as migration_20260225_150000_srs_answers_email from './20260225_150000_srs_answers_email';
import * as migration_20260225_create_kanako_chat_logs from './20260225_create_kanako_chat_logs';
import * as migration_20260226_add_display_name_to_chat_access from './20260226_add_display_name_to_chat_access';
import * as migration_20260303_072050 from './20260303_072050';
import * as migration_20260303_add_privacy_legal from './20260303_add_privacy_legal';
import * as migration_20260303_add_seo_fields from './20260303_add_seo_fields';
import * as migration_20260303_add_media_ogp from './20260303_add_media_ogp';
import * as migration_20260303_fix_media_rels from './20260303_fix_media_rels';
import * as migration_20260303_fix_media_columns from './20260303_fix_media_columns';
import * as migration_20260303_logs_cover_image from './20260303_logs_cover_image';
import * as migration_20260303_logs_drafts from './20260303_logs_drafts';
import * as migration_20260303_fix_logs_v_columns from './20260303_fix_logs_v_columns';
import * as migration_20260303_logs_nullable_for_drafts from './20260303_logs_nullable_for_drafts';
import * as migration_20260303_site_settings_posts_per_page from './20260303_site_settings_posts_per_page';
export const migrations = [
  {
    up: migration_20260225_011223_initial.up,
    down: migration_20260225_011223_initial.down,
    name: '20260225_011223_initial',
  },
  {
    up: migration_20260225_150000_srs_answers_email.up,
    down: migration_20260225_150000_srs_answers_email.down,
    name: '20260225_150000_srs_answers_email',
  },
  {
    up: migration_20260225_create_kanako_chat_logs.up,
    down: migration_20260225_create_kanako_chat_logs.down,
    name: '20260225_create_kanako_chat_logs',
  },
  {
    up: migration_20260226_add_display_name_to_chat_access.up,
    down: migration_20260226_add_display_name_to_chat_access.down,
    name: '20260226_add_display_name_to_chat_access',
  },
  {
    up: migration_20260303_072050.up,
    down: migration_20260303_072050.down,
    name: '20260303_072050',
  },
  {
    up: migration_20260303_add_privacy_legal.up,
    down: migration_20260303_add_privacy_legal.down,
    name: '20260303_add_privacy_legal',
  },
  {
    up: migration_20260303_add_seo_fields.up,
    down: migration_20260303_add_seo_fields.down,
    name: '20260303_add_seo_fields',
  },
  {
    up: migration_20260303_add_media_ogp.up,
    down: migration_20260303_add_media_ogp.down,
    name: '20260303_add_media_ogp',
  },
  {
    up: migration_20260303_fix_media_rels.up,
    down: migration_20260303_fix_media_rels.down,
    name: '20260303_fix_media_rels',
  },
  {
    up: migration_20260303_fix_media_columns.up,
    down: migration_20260303_fix_media_columns.down,
    name: '20260303_fix_media_columns',
  },
  {
    up: migration_20260303_logs_cover_image.up,
    down: migration_20260303_logs_cover_image.down,
    name: '20260303_logs_cover_image',
  },
  {
    up: migration_20260303_logs_drafts.up,
    down: migration_20260303_logs_drafts.down,
    name: '20260303_logs_drafts',
  },
  {
    up: migration_20260303_fix_logs_v_columns.up,
    down: migration_20260303_fix_logs_v_columns.down,
    name: '20260303_fix_logs_v_columns',
  },
  {
    up: migration_20260303_logs_nullable_for_drafts.up,
    down: migration_20260303_logs_nullable_for_drafts.down,
    name: '20260303_logs_nullable_for_drafts',
  },
  {
    up: migration_20260303_site_settings_posts_per_page.up,
    down: migration_20260303_site_settings_posts_per_page.down,
    name: '20260303_site_settings_posts_per_page',
  },
];
