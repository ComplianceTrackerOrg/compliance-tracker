import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import path from "path"

import tsconfig from "./tsconfig.json"

const alias = Object.fromEntries(
  Object.entries(tsconfig.compilerOptions.paths).map(([key, [value]]) => [
    key.replace("/*", ""),
    path.resolve(__dirname, value.replace("/*", "")),
  ])
)

export default defineConfig({
  resolve: {
    alias,
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/features/**/*.spec.tsx"],
    exclude: ["node_modules"],
    coverage: {
      enabled: true,
      include: ["src/features/**/*.tsx"],
      thresholds: {
        lines: 80,
        statements: 80,
        branches: 80,
        functions: 80,
      },
    },
    reporters: ["default", "html"],
  },
})
