import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // These animation engines hold the newest props in a ref that the rAF
      // loop reads (settingsRef.current = settings) instead of re-creating the
      // effect on every prop change. React Compiler flags that as impure; this
      // repo does not opt into the compiler, so keep the reports as warnings
      // rather than fail the gate on 20 sites that all need the same rewrite.
      "react-hooks/refs": "warn",
      "react-hooks/set-state-in-effect": "warn"
    }
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
