import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

export default [
	...compat.extends('next/core-web-vitals'),
	{
		files: ['**/*.ts', '**/*.tsx'],
		rules: {
			'@typescript-eslint/no-unused-vars': 'warn',
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'@typescript-eslint/no-explicit-any': 'off',
			'react/no-unescaped-entities': 'off',
		},
	},
];
