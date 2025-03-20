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
    include: ["src/components/**/*.spec.tsx"],
    exclude: ["node_modules"],
    coverage: {
      enabled: true,
      include: ["src/components/**/*.tsx"],
    },
    reporters: ["default", "html"],
  },
})
