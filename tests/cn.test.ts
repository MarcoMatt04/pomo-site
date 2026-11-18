import test from "node:test";
import assert from "node:assert/strict";

import { cn } from "../lib/streamui/cn.ts";

test("cn keeps a later utility that overrides an earlier one", () => {
  assert.equal(cn("p-2", "p-4"), "p-4");
});

test("cn keeps a pattern utility and a colour together", () => {
  // the reason this helper exists: bg-dots is a background image, so it must
  // survive `bg-paper` as a conflicting colour instead of replacing it
  const out = cn("bg-paper", "bg-dots");
  assert.ok(out.includes("bg-paper"));
  assert.ok(out.includes("bg-dots"));
});

test("cn merges same-group utilities and keeps unrelated ones", () => {
  assert.equal(cn("text-sm", "text-lg", "rounded"), "text-lg rounded");
});

test("cn treats falsey inputs as nothing", () => {
  assert.equal(cn(undefined, null, false, "", "p-2"), "p-2");
  assert.equal(cn(), "");
});

test("cn lets the later brutal shadow win", () => {
  // the theme treats shadow-brutal* as the same group, so they must collide
  const out = cn("shadow-brutal", "shadow-brutal-lg");
  assert.ok(out.includes("brutal-lg"));
  assert.ok(!out.includes("shadow-brutal "));
});
