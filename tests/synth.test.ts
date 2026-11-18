import test from "node:test";
import assert from "node:assert/strict";

import { renderTrack, encodeWav, trackSeconds, SAMPLE_RATE } from "../lib/streamui/audio/synth.ts";
import type { TrackSpec } from "../lib/streamui/audio/synth.ts";

// shortcut: a real browser renderer is not used here — only the synth's maths
const spec = (over: Partial<TrackSpec> = {}): TrackSpec => ({
  bpm: 120,
  leadWave: "square",
  lead: [69, null, 71, null],
  bass: [45, null, null, null],
  kick: [0],
  hat: [2],
  loops: 2,
  ...over
});

test("renderTrack returns one second of 16ths per step, repeated", () => {
  const out = renderTrack(spec());
  // 4 steps x 2 loops, each step = 60/120/4 s = 125 ms
  const expected = Math.round(SAMPLE_RATE * 0.125) * 4 * 2;
  assert.ok(Math.abs(out.length - expected) <= 4, `${out.length} vs ${expected}`);
  assert.equal(out.length, Math.round(trackSeconds(spec()) * SAMPLE_RATE));
});

test("renderTrack never leaves [-1, 1]", () => {
  // the worst case the audio graph can produce: every layer on the same step
  const loud = spec({
    bpm: 300,
    leadWave: "square",
    lead: [81, 81, 81, 81],
    bass: [60, 60, 60, 60],
    kick: [0, 1, 2, 3],
    hat: [0, 1, 2, 3],
    loops: 4
  });
  const out = renderTrack(loud);
  let peak = 0;
  for (const sample of out) peak = Math.max(peak, Math.abs(sample));
  assert.ok(peak <= 1, `peak ${peak}`);
});

test("a rest stays silent and a note does not", () => {
  const silent = renderTrack(spec({ lead: [null, null, null, null], bass: [null, null, null, null], kick: [], hat: [], loops: 1 }));
  assert.equal(silent.every(s => s === 0), true);

  const one = renderTrack(spec({ lead: [69, null, null, null], bass: [null, null, null, null], kick: [], hat: [], loops: 1 }));
  assert.ok(one.some(s => s !== 0));
});

test("renderTrack survives nonsense instead of hanging or exploding", () => {
  for (const bad of [
    spec({ bpm: 0 }),
    spec({ bpm: -1 }),
    spec({ bpm: 1e9 }), // renders a huge-but-finite track, or nothing
    spec({ lead: [], bass: [] }),
    spec({ loops: 0 })
  ]) {
    const out = renderTrack(bad);
    assert.equal(out.every(Number.isFinite), true);
    assert.ok(out.length < 5e8, `suspicious length ${out.length}`);
  }
});

test("encodeWav writes a file the declared size matches", () => {
  const samples = renderTrack(spec({ loops: 1 }));
  const wav = encodeWav(samples);
  assert.equal(wav.byteLength, 44 + samples.length * 2);

  const view = new DataView(wav);
  assert.equal(String.fromCharCode(...new Uint8Array(wav, 0, 4)), "RIFF");
  assert.equal(view.getUint32(4, true), wav.byteLength - 8);
  assert.equal(view.getUint16(22, true), 1); // mono
  assert.equal(view.getUint32(24, true), SAMPLE_RATE);
  assert.equal(view.getUint16(34, true), 16); // bits
  assert.equal(String.fromCharCode(...new Uint8Array(wav, 36, 4)), "data");

  // round trip: 16-bit PCM, so the value comes back within one LSB
  const rt = encodeWav(new Float32Array([0.5, -0.5, 0]), 22050);
  const rv = new DataView(rt);
  const pos = 1 / 32767;
  const neg = 1 / 32768;
  assert.ok(Math.abs(rv.getInt16(44, true) * pos - 0.5) < 1.01 * pos);
  assert.ok(Math.abs(rv.getInt16(46, true) * neg + 0.5) < 1.01 * neg);
  assert.equal(rv.getInt16(48, true), 0);
});
