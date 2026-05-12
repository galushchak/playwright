import { defineConfig } from 'eslint/config';

import tsParser from '@typescript-eslint/parser';
import gpkg from 'globals';
const { node } = gpkg;
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import playwright from 'eslint-plugin-playwright';
import pkg from '@eslint/js';
const { configs } = pkg;
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

function getDirname(importMetaUrl) {
  const filename = fileURLToPath(importMetaUrl);
  return dirname(filename);
}

const compat = new FlatCompat({
  baseDirectory: getDirname(import.meta.url),
  recommendedConfig: configs.recommended,
  allConfig: configs.all,
});

export default defineConfig([
  {
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: 'module',

      globals: {
        ...node,
      },
    },

    plugins: {
      '@typescript-eslint': typescriptEslint,
      playwright,
    },

    extends: compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:playwright/recommended',
      'plugin:prettier/recommended'
    ),

    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],

      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],
    },
  },
  {
    files: ['tests/**/*.{spec,test}.{ts,tsx}'],
    extends: compat.extends('plugin:playwright/recommended'),
  },
]);
