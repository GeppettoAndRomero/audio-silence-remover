/**
 * ConversionManager (audio-silence-remover).
 * 音声を 1 つ受け取り、無音部分を取り除いて MP3 をダウンロード。
 * Web Audio でデコード → 無音検出 → lamejs で MP3 化（メインスレッド、サーバー不要）。
 */

import { useState, useEffect, useCallback, useRef } from 'preact/hooks';
import { AppCard } from './AppCard';
import { ErrorToast } from './ErrorToast';
import { removeSilence } from '@/utils/audioEngine';
import { ui } from '@/i18n/ui';

interface ErrorToastItem {
  id: string;
  message: string;
}

interface ConversionManagerProps {
  locale?: string;
}

export function ConversionManager({ locale = 'en' }: ConversionManagerProps) {
  const t = (ui as any)[locale] ?? ui.en;
  const [file, setFile] = useState<File | null>(null);
  const [threshold, setThreshold] = useState(0.01);
  const [minSilence, setMinSilence] = useState(0.5);
  const [busy, setBusy] = useState(false);
  const [errorToasts, setErrorToasts] = useState<ErrorToastItem[]>([]);
  const cfg = useRef({ threshold, minSilence });
  cfg.current = { threshold, minSilence };

  const showErrorToast = useCallback((message: string) => {
    const id = `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setErrorToasts((prev) => [...prev, { id, message }]);
  }, []);
  const removeErrorToast = useCallback((id: string) => {
    setErrorToasts((prev) => prev.filter((e) => e.id !== id));
  }, []);

  useEffect(() => {
    (globalThis as Record<string, unknown>).__toolReady = true;
  }, []);

  const isAudio = (f: File) => /\.(mp3|wav|m4a|aac|ogg|flac|webm)$/i.test(f.name) || f.type.startsWith('audio/');

  const handleFiles = useCallback(
    (files: File[]) => {
      const audio = files.find(isAudio);
      if (!audio) {
        if (files.length > 0) showErrorToast(t.errUnsupported.replace('{name}', files[0].name));
      } else {
        setFile(audio);
      }
      window.dispatchEvent(new CustomEvent('filesProcessed'));
    },
    [showErrorToast, t]
  );

  useEffect(() => {
    const handler = (e: Event) => handleFiles((e as CustomEvent<File[]>).detail);
    window.addEventListener('filesDropped', handler);
    return () => window.removeEventListener('filesDropped', handler);
  }, [handleFiles]);

  const handleRemove = useCallback(async () => {
    if (!file || busy) return;
    setBusy(true);
    try {
      const blob = await removeSilence(file, {
        threshold: cfg.current.threshold,
        minSilenceSec: cfg.current.minSilence,
        padSec: 0.05,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace(/\.[^.]+$/, '') + '-trimmed.mp3';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      showErrorToast(error instanceof Error ? error.message : 'Failed');
    } finally {
      setBusy(false);
    }
  }, [file, busy, showErrorToast]);

  return (
    <div>
      <AppCard>
        <div style="margin-bottom: var(--space-4);">
          <h3 style="margin: 0 0 var(--space-1) 0; font-size: var(--fs-4); font-weight: 600;">
            {t.uploadHeading}
          </h3>
          <p style="margin: 0; font-size: var(--fs-2); color: var(--color-subtle);">
            {t.uploadSubtitle}
          </p>
        </div>

        <div
          style={{
            padding: 'var(--space-6)',
            border: '2px dashed var(--color-border)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-surface)',
            textAlign: 'center',
            marginBottom: 'var(--space-4)',
            cursor: 'pointer',
          }}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <div style="font-size: 3rem; margin-bottom: var(--space-2);">🔊</div>
          <div style="font-size: var(--fs-3); font-weight: 600; margin-bottom: var(--space-2);">
            {t.dropClick}
          </div>
          <div style="font-size: var(--fs-1); color: var(--color-subtle);">{t.dropOr}</div>
          <div style="font-size: var(--fs-1); color: var(--color-subtle); margin-top: var(--space-1);">
            {t.dropSupported}
          </div>
          <input
            id="file-input"
            type="file"
            accept="audio/*,.mp3,.wav,.m4a,.aac,.ogg,.flac"
            onChange={(e) => {
              handleFiles(Array.from(e.currentTarget.files || []));
              e.currentTarget.value = '';
            }}
            style="display: none;"
          />
        </div>

        {file && (
          <div style="display: flex; flex-direction: column; gap: var(--space-3);">
            <strong style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{file.name}</strong>
            <label style="font-size: var(--fs-2); display: flex; flex-direction: column; gap: var(--space-1);">
              {t.thresholdLabel ?? 'Silence threshold'} <span class="num">{threshold.toFixed(3)}</span>
              <input type="range" min="0.001" max="0.1" step="0.001" value={threshold} onInput={(e) => setThreshold(Number(e.currentTarget.value))} />
            </label>
            <label style="font-size: var(--fs-2); display: flex; flex-direction: column; gap: var(--space-1);">
              {t.minSilenceLabel ?? 'Minimum silence (seconds)'} <span class="num">{minSilence.toFixed(2)}</span>
              <input type="range" min="0.1" max="2" step="0.1" value={minSilence} onInput={(e) => setMinSilence(Number(e.currentTarget.value))} />
            </label>
            <div style="display: flex; justify-content: flex-end;">
              <button id="remove-silence-action" onClick={handleRemove} disabled={busy} class="app-button app-button--primary">
                {busy ? (t.processing ?? 'Processing…') : (t.removeButton ?? 'Remove silence')}
              </button>
            </div>
          </div>
        )}
      </AppCard>

      {errorToasts.length > 0 && (
        <div className="error-toast-container" aria-label={t.notificationsAria}>
          {errorToasts.map((toast) => (
            <ErrorToast key={toast.id} id={toast.id} message={toast.message} onClose={removeErrorToast} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
