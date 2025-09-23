const js = require('@eslint/js');
const typescript = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');

module.exports = [
	{
		ignores: [
			'**/node_modules/**',
			'**/dist/**',
			'**/build/**',
			'**/.vitepress/**',
			'**/cache/**',
			'**/.cache/**',
			'**/.nuxt/**',
			'**/.output/**',
			'**/.vite/**',
			'**/coverage/**',
			'**/*.min.js',
			'**/*.bundle.js',
			'**/public/**',
			'**/static/**',
		],
	},
	js.configs.recommended,
	{
		files: [
			'src/**/*.{js,jsx}',
			'lib/**/*.{js,jsx}',
			'components/**/*.{js,jsx}',
		],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
		rules: {
			indent: ['error', 'tab'],
			quotes: ['error', 'single'],
			semi: ['error', 'always'],
		},
	},
	{
	files: [
		'src/**/*.{ts,tsx}',
		'lib/**/*.{ts,tsx}',
		'components/**/*.{ts,tsx}',
		'tests/**/*.{ts,tsx}',
	],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parser: typescriptParser,
		},
		plugins: {
			'@typescript-eslint': typescript,
		},
		rules: {
			indent: ['error', 'tab'],
			quotes: ['error', 'single'],
			semi: ['error', 'always'],
			'no-redeclare': 'off',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-empty-function': 'off',
		},
	},
];
