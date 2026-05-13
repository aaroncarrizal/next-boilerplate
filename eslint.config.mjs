import { defineConfig, globalIgnores } from "eslint/config"
import stylistic from "@stylistic/eslint-plugin"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import tseslint from "typescript-eslint"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  stylistic.configs.recommended,
  ...tseslint.config({
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  }),
  {
    rules: {
      "@stylistic/comma-dangle": ["error", "always-multiline"],
      "@stylistic/quotes": ["error", "double", { avoidEscape: true }],
      "react/react-in-jsx-scope": "off",
      "react/jsx-props-no-spreading": "off",
      "no-param-reassign": ["error", { props: false }],
    },
  },
  {
    files: ["components/ui/**"],
    rules: {
      "@stylistic/max-len": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
])

export default eslintConfig
