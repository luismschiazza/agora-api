import js from '@eslint/js';
import globals from 'globals';
import tsESLint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: ['node_modules/**', 'dist/**'],
  },
  {
    files: ['src/**/*.ts', 'test/**/*.ts'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      parser: tsESLint.parser,
      parserOptions: { project: './tsconfig.json' },
      globals: globals.node,
    },
  },
  {
    rules: {
      'no-unused-vars': 'warn'
    }
  },
  tsESLint.configs.recommended,
  tsESLint.configs.recommendedTypeChecked,
  eslintConfigPrettier,
]);
