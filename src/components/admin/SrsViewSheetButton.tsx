'use client';

import React from 'react';
import { useFormFields } from '@payloadcms/ui';

/** 診断結果を base64 エンコードして detail ページ用の data パラメータを生成 */
function encodeResultToDataUrl(obj: Record<string, unknown>): string {
  const jsonString = JSON.stringify(obj);
  const utf8Bytes = encodeURIComponent(jsonString).replace(
    /%([0-9A-F]{2})/g,
    (_, p1) => String.fromCharCode(parseInt(p1, 16))
  );
  const base64 = btoa(utf8Bytes);
  return encodeURIComponent(base64);
}

export function SrsViewSheetButton() {
  const metadata = useFormFields(([fields]) => fields.metadata?.value as Record<string, unknown> | undefined);

  if (!metadata || typeof metadata !== 'object') {
    return (
      <div style={{ padding: '12px', color: 'var(--theme-elevation-500)', fontSize: '14px' }}>
        診断シートのデータがありません。
      </div>
    );
  }

  const hasResult = metadata.score != null || metadata.name != null || metadata.desc != null;
  if (!hasResult) {
    return (
      <div style={{ padding: '12px', color: 'var(--theme-elevation-500)', fontSize: '14px' }}>
        診断結果データが不足しています。
      </div>
    );
  }

  const dataParam = encodeResultToDataUrl(metadata);
  const href = `/srs/result/detail?data=${dataParam}`;

  return (
    <div style={{ marginBottom: 16 }}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 20px',
          backgroundColor: 'var(--theme-elevation-0)',
          color: 'var(--theme-success-500)',
          border: '2px solid var(--theme-success-500)',
          borderRadius: 8,
          fontWeight: 600,
          textDecoration: 'none',
          fontSize: 14,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        シートを見る
      </a>
    </div>
  );
}
