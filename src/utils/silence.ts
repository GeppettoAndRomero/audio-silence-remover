/**
 * Pure silence-detection logic (no Web Audio — unit-testable in Node).
 * Given mono PCM samples and a threshold, find the regions to KEEP (non-silent),
 * with a little padding so cuts don't click.
 */

export interface SilenceOpts {
  /** amplitude (0..1) at or below which a sample counts as silent */
  threshold: number;
  /** minimum silent run (seconds) before it's treated as removable silence */
  minSilenceSec: number;
  /** keep this much audio (seconds) on each side of a kept region (anti-click pad) */
  padSec: number;
}

export interface Region {
  start: number; // sample index, inclusive
  end: number; // sample index, exclusive
}

/** Returns the non-silent regions to keep. Empty array if the whole clip is silent. */
export function findKeepRegions(
  samples: Float32Array,
  sampleRate: number,
  opts: SilenceOpts
): Region[] {
  const n = samples.length;
  const minSilent = Math.max(1, Math.floor(opts.minSilenceSec * sampleRate));
  const pad = Math.max(0, Math.floor(opts.padSec * sampleRate));

  // Mark each sample silent/loud, then collapse loud runs (merging gaps shorter
  // than minSilent so we don't chop natural micro-pauses).
  const loud: Array<[number, number]> = [];
  let runStart = -1;
  let silenceLen = 0;
  for (let i = 0; i < n; i++) {
    const isLoud = Math.abs(samples[i]) > opts.threshold;
    if (isLoud) {
      if (runStart < 0) runStart = i;
      silenceLen = 0;
    } else if (runStart >= 0) {
      silenceLen++;
      if (silenceLen >= minSilent) {
        loud.push([runStart, i - silenceLen + 1]);
        runStart = -1;
        silenceLen = 0;
      }
    }
  }
  if (runStart >= 0) loud.push([runStart, n]);

  // Apply padding and clamp/merge overlaps.
  const regions: Region[] = [];
  for (const [s, e] of loud) {
    const start = Math.max(0, s - pad);
    const end = Math.min(n, e + pad);
    const last = regions[regions.length - 1];
    if (last && start <= last.end) last.end = Math.max(last.end, end);
    else regions.push({ start, end });
  }
  return regions;
}
