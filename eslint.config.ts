// @ts-nocheck
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    ignores: [
      "dist/**",
      "build/**",
      "node_modules/**",
      "src/**/*.d.ts",
      "types/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked.map((cfg) => ({
    ...cfg,
    files: ["src/**/*.ts"],
    languageOptions: {
      ...(cfg.languageOptions || {}),
      parserOptions: {
        ...((cfg.languageOptions && cfg.languageOptions.parserOptions) || {}),
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  })),
  {
    files: ["src/**/*.ts"],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier: prettier,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        process: "readonly",
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "prettier/prettier": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "react-hooks/error-boundaries": "error",
      "react-hooks/set-state-in-effect": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      semi: ["error", "never"],
      quotes: ["error", "single", { avoidEscape: true }],
      "no-restricted-imports": [
        "error",
        {
          patterns: ["../*", "../../*", "../../../*", "../../../../*"],
        },
      ],
    },
  },
  {
    files: [
      "*.js",
      "*.ts",
      "*.mjs",
      "scripts/**/*.js",
      "vite.config.ts",
      "eslint.config.ts",
      "prettier.config.js",
    ],
    ...tseslint.configs.disableTypeChecked,
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  prettierConfig,
];
