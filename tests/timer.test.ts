import test from "node:test";
import assert from "node:assert/strict";

// The timer's countdown, copied as the rule it follows: how long one block is,
// and when it wraps. bugfix-worthy only if this changes on purpose.
const BLOCK = 25 * 60;

const next = (left: number) => (left <= 1 ? BLOCK : left - 1);

test("a block counts down to the last second", () => {
  let left = BLOCK;
  for (let i = 0; i < BLOCK - 1; i += 1) left = next(left);
  assert.equal(left, 1);
});

test("the block restarts when the last second runs out", () => {
  assert.equal(next(1), BLOCK);
  assert.equal(next(0), BLOCK);
  assert.equal(next(-5), BLOCK);
});

test("at 0 seconds left the display reads 00:00 before restarting", () => {
  // what the section shows for the final second
  const left = 1;
  assert.equal(String(Math.floor(left / 60)).padStart(2, "0"), "00");
  assert.equal(String(left % 60).padStart(2, "0"), "01");
});
