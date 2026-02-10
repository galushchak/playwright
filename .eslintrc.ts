module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        project: './tsconfig.json'
    },
    env: {
        node: true,
        es2021: true,
    },
    plugins: ['@typescript-eslint', 'playwright'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:playwright/recommended',
        'plugin:prettier/recommended'
    ],
    overrides: [
        {
            files: ['tests/**/*.spec.{ts,tsx}'],
            extends: ['plugin:playwright/recommended']
        }
    ],
    rules: {
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'no-console': ['error', { allow: ['warn', 'error'] }]
    }
};
