import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { waitReady, convert } from './_helpers';

test.describe('silence removal', () => {
  test('trims silence into an MP3 in the browser, no upload', async ({ page }) => {
    const external: string[] = [];
    page.on('request', (req) => {
      const u = req.url();
      if (!u.startsWith('http://localhost:4321') && !u.startsWith('data:') && !u.startsWith('blob:')) external.push(u);
    });
    await page.goto('/audio-silence-remover/');
    await waitReady(page);
    const download = await convert(page);
    expect(download.suggestedFilename()).toMatch(/\.mp3$/);
    const buf = readFileSync((await download.path()) as string);
    expect(buf.length).toBeGreaterThan(100);
    // MP3 frame sync (0xFFE) or ID3
    const ok = buf[0] === 0xff && (buf[1] & 0xe0) === 0xe0;
    const id3 = buf[0] === 0x49 && buf[1] === 0x44 && buf[2] === 0x33;
    expect(ok || id3).toBe(true);
    expect(external, external.join(', ')).toHaveLength(0);
  });
});
