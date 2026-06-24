/**
 * Remove silent sections from audio, in the browser. Web Audio decodes the file,
 * silence.ts finds the parts to keep, and lamejs (pure JS) re-encodes to MP3.
 * No WASM, no server.
 */
import { Mp3Encoder } from '@breezystack/lamejs';
import { findKeepRegions, type SilenceOpts } from './silence';

export async function removeSilence(file: File, opts: SilenceOpts): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new Ctx();
  let audio: AudioBuffer;
  try {
    audio = await ctx.decodeAudioData(arrayBuffer);
  } catch {
    await ctx.close();
    throw new Error('Could not decode this audio file.');
  }
  await ctx.close();

  const len = audio.length;
  const channels = audio.numberOfChannels;
  const mono = new Float32Array(len);
  for (let c = 0; c < channels; c++) {
    const data = audio.getChannelData(c);
    for (let i = 0; i < len; i++) mono[i] += data[i] / channels;
  }

  const regions = findKeepRegions(mono, audio.sampleRate, opts);
  if (regions.length === 0) throw new Error('The whole clip is silent — nothing to keep.');

  const keptLen = regions.reduce((s, r) => s + (r.end - r.start), 0);
  const out = new Int16Array(keptLen);
  let o = 0;
  for (const r of regions) {
    for (let i = r.start; i < r.end; i++) {
      const v = mono[i];
      out[o++] = v < 0 ? Math.max(-32768, v * 32768) : Math.min(32767, v * 32767);
    }
  }

  const encoder = new Mp3Encoder(1, audio.sampleRate, 128);
  const chunks: Uint8Array[] = [];
  const block = 1152;
  for (let i = 0; i < out.length; i += block) {
    const buf = encoder.encodeBuffer(out.subarray(i, i + block));
    if (buf.length > 0) chunks.push(buf);
  }
  const end = encoder.flush();
  if (end.length > 0) chunks.push(end);
  return new Blob(chunks as BlobPart[], { type: 'audio/mpeg' });
}
