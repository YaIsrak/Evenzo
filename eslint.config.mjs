import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = [
	...nextVitals,
	{
		files: ['**/*.ts', '**/*.tsx'],
		rules: {
			'@typescript-eslint/no-unused-vars': 'warn',
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'@typescript-eslint/no-explicit-any': 'off',
			'react/no-unescaped-entities': 'off',
			'react-hooks/set-state-in-effect': 'warn',
			'react-hooks/purity': 'warn',
		},
	},
];

export default eslintConfig;
