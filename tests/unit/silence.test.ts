import { describe, it, expect } from 'vitest';
import { findKeepRegions } from '@/utils/silence';

const SR = 1000; // 1000 samples/sec for easy maths
function build(pattern: Array<['loud' | 'silent', number]>): Float32Array {
  const total = pattern.reduce((s, [, sec]) => s + sec * SR, 0);
  const a = new Float32Array(total);
  let i = 0;
  for (const [kind, sec] of pattern) {
    const end = i + sec * SR;
    if (kind === 'loud') for (; i < end; i++) a[i] = 0.5;
    else i = end;
  }
  return a;
}
const OPTS = { threshold: 0.05, minSilenceSec: 0.3, padSec: 0 };

describe('findKeepRegions', () => {
  it('splits two loud parts separated by long silence', () => {
    const a = build([['loud', 0.4], ['silent', 0.5], ['loud', 0.4]]);
    const r = findKeepRegions(a, SR, OPTS);
    expect(r.length).toBe(2);
    expect(r[0]).toEqual({ start: 0, end: 400 });
    expect(r[1]).toEqual({ start: 900, end: 1300 });
  });
  it('keeps short gaps (below minSilence) inside one region', () => {
    const a = build([['loud', 0.4], ['silent', 0.1], ['loud', 0.4]]);
    const r = findKeepRegions(a, SR, OPTS);
    expect(r.length).toBe(1);
    expect(r[0]).toEqual({ start: 0, end: 900 });
  });
  it('returns the whole clip when there is no silence', () => {
    const a = build([['loud', 1]]);
    expect(findKeepRegions(a, SR, OPTS)).toEqual([{ start: 0, end: 1000 }]);
  });
  it('returns nothing when the clip is all silent', () => {
    expect(findKeepRegions(build([['silent', 1]]), SR, OPTS)).toEqual([]);
  });
  it('applies padding around kept regions', () => {
    const a = build([['silent', 0.5], ['loud', 0.4], ['silent', 0.5]]);
    const r = findKeepRegions(a, SR, { ...OPTS, padSec: 0.1 });
    expect(r[0].start).toBe(400); // 500 - 100 pad
    expect(r[0].end).toBe(1000); // 900 + 100 pad
  });
});
